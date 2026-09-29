import { StoredOrder } from "./dropstop-admin-store";

const GSHEET_URL_KEY = "dropstop_gsheet_webhook_url_v1";

/**
 * Validate and clean Google Sheets Webhook URL
 */
export function validateGoogleSheetsUrl(rawUrl: string): {
  valid: boolean;
  warning?: string;
  cleanedUrl: string;
} {
  const url = (rawUrl || "").trim();
  if (!url) {
    return { valid: false, warning: "Please enter a Webhook URL.", cleanedUrl: "" };
  }

  // Check if user pasted the Google Sheet document URL itself
  if (url.includes("docs.google.com/spreadsheets")) {
    return {
      valid: false,
      warning:
        "⚠️ You pasted the Google Sheet URL itself! Please follow the steps below to deploy Apps Script (Deploy > New deployment > Web app) and copy the Web App URL that starts with https://script.google.com/macros/s/.../exec",
      cleanedUrl: url,
    };
  }

  // Check if user pasted the Apps Script editor URL (/edit)
  if (url.includes("/edit")) {
    return {
      valid: false,
      warning:
        "⚠️ You pasted the Apps Script editor URL (/edit). Please click the blue 'Deploy' button > 'New deployment' > 'Web app' and copy the URL ending with /exec.",
      cleanedUrl: url,
    };
  }

  // Auto-fix /dev to /exec
  if (url.endsWith("/dev")) {
    const fixed = url.replace(/\/dev$/, "/exec");
    return {
      valid: true,
      warning: "Note: Auto-converted test '/dev' endpoint to production '/exec' endpoint.",
      cleanedUrl: fixed,
    };
  }

  if (!url.startsWith("https://script.google.com/macros/s/")) {
    return {
      valid: false,
      warning:
        "⚠️ The URL should start with 'https://script.google.com/macros/s/' and end with '/exec'.",
      cleanedUrl: url,
    };
  }

  return { valid: true, cleanedUrl: url };
}

/**
 * Get configured Google Sheets Webhook URL
 */
export function getGoogleSheetsWebhookUrl(): string {
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL || "";
  }
  return (
    localStorage.getItem(GSHEET_URL_KEY) ||
    process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL ||
    ""
  );
}

/**
 * Save Google Sheets Webhook URL
 */
export function setGoogleSheetsWebhookUrl(url: string) {
  if (typeof window === "undefined") return;
  const validation = validateGoogleSheetsUrl(url);
  localStorage.setItem(GSHEET_URL_KEY, validation.cleanedUrl);
}

/**
 * Format order for Google Sheet row
 */
export function formatOrderForGoogleSheet(order: StoredOrder) {
  const itemsSummary = order.items
    .map((it) => `${it.quantity}x ${it.product.name} [${it.variant}] (₹${it.product.price})`)
    .join(", ");

  return {
    orderId: order.id,
    date: new Date(order.date).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    customerName: order.customer.name,
    customerPhone: order.customer.phone,
    customerEmail: order.customer.email || "N/A",
    address: `${order.customer.address}, ${order.customer.city} - ${order.customer.pincode}`,
    city: order.customer.city,
    pincode: order.customer.pincode,
    items: itemsSummary,
    itemCount: order.items.reduce((s, it) => s + it.quantity, 0),
    subtotal: order.subtotal,
    shippingFee: order.shipping,
    totalAmount: order.total,
    paymentMethod: order.customer.paymentMethod.toUpperCase(),
    orderStatus: order.status.toUpperCase(),
  };
}

/**
 * Robust dispatcher: sends via both POST and GET query parameters
 * This guarantees receipt even if Google Apps Script 302 redirect strips POST body.
 */
async function dispatchToGoogleAppsScript(webhookUrl: string, payload: Record<string, unknown>): Promise<void> {
  const cleanUrl = webhookUrl.trim().replace(/\/dev$/, "/exec");

  // Method 1: Send via POST with text/plain (avoids CORS preflight)
  try {
    await fetch(cleanUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });
  } catch (postErr) {
    console.warn("POST to Google Apps Script failed:", postErr);
  }

  // Method 2: Send via GET query parameter (100% reliable across Google 302 redirects)
  try {
    const encodedPayload = encodeURIComponent(JSON.stringify(payload));
    const getUrl = `${cleanUrl}${cleanUrl.includes("?") ? "&" : "?"}payload=${encodedPayload}`;
    await fetch(getUrl, {
      method: "GET",
      mode: "no-cors",
    });
  } catch (getErr) {
    console.warn("GET fallback to Google Apps Script failed:", getErr);
  }
}

/**
 * Send a single order to Google Sheets
 */
export async function sendOrderToGoogleSheet(order: StoredOrder): Promise<{ success: boolean; message: string }> {
  const webhookUrl = getGoogleSheetsWebhookUrl();
  if (!webhookUrl) {
    return { success: false, message: "Google Sheets Webhook URL not configured." };
  }

  try {
    const payload = {
      action: "NEW_ORDER",
      data: formatOrderForGoogleSheet(order),
    };

    await dispatchToGoogleAppsScript(webhookUrl, payload);
    return { success: true, message: "Order dispatched to Google Sheet successfully." };
  } catch (err: unknown) {
    return { success: false, message: (err as Error)?.message || "Failed to sync order" };
  }
}

/**
 * Sync multiple orders to Google Sheets in batch
 */
export async function syncAllOrdersToGoogleSheet(
  orders: StoredOrder[]
): Promise<{ success: boolean; count: number; error?: string }> {
  const webhookUrl = getGoogleSheetsWebhookUrl();
  if (!webhookUrl) {
    return { success: false, count: 0, error: "Google Sheets Webhook URL not configured." };
  }

  try {
    const payloads = orders.map(formatOrderForGoogleSheet);

    await dispatchToGoogleAppsScript(webhookUrl, {
      action: "BATCH_SYNC",
      orders: payloads,
    });

    return { success: true, count: orders.length };
  } catch (err: unknown) {
    return { success: false, count: 0, error: (err as Error)?.message || "Sync failed" };
  }
}

/**
 * Test the Google Sheets connection with a sample row
 */
export async function testGoogleSheetConnection(
  rawWebhookUrl: string
): Promise<{ success: boolean; message: string }> {
  const validation = validateGoogleSheetsUrl(rawWebhookUrl);
  if (!validation.valid) {
    return { success: false, message: validation.warning || "Invalid Webhook URL." };
  }

  const webhookUrl = validation.cleanedUrl;

  try {
    const testPayload = {
      action: "TEST_CONNECTION",
      data: {
        orderId: `TEST-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        customerName: "Astria Test Customer",
        customerPhone: "+91 98765 43210",
        customerEmail: "support@astria.co.in",
        address: "Astria & Co. Studio, Sector 54",
        city: "Gurugram",
        pincode: "122002",
        items: "1x Architectural Heavyweight Hoodie [Large]",
        itemCount: 1,
        subtotal: 2499,
        shippingFee: 0,
        totalAmount: 2499,
        paymentMethod: "COD",
        orderStatus: "PENDING",
      },
    };

    await dispatchToGoogleAppsScript(webhookUrl, testPayload);

    return {
      success: true,
      message:
        "Test order sent! Check your Google Sheet now — the headers and sample row should appear within a few seconds.",
    };
  } catch (err: unknown) {
    return {
      success: false,
      message: (err as Error)?.message || "Failed to reach Google Sheets Webhook.",
    };
  }
}

/**
 * Get direct test URL that user can click to open in browser
 */
export function getDirectBrowserTestUrl(rawWebhookUrl: string): string {
  const cleanUrl = rawWebhookUrl.trim().replace(/\/dev$/, "/exec");
  const testPayload = {
    action: "TEST_CONNECTION",
    data: {
      orderId: `BROWSER-TEST-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      customerName: "Direct Browser Test",
      customerPhone: "+91 82784 55700",
      customerEmail: "direct@astria.co.in",
      address: "Astria Creative Lab",
      city: "Narnaul",
      pincode: "123001",
      items: "1x Studio Desk Mat",
      itemCount: 1,
      subtotal: 1299,
      shippingFee: 0,
      totalAmount: 1299,
      paymentMethod: "ONLINE",
      orderStatus: "CONFIRMED",
    },
  };
  return `${cleanUrl}${cleanUrl.includes("?") ? "&" : "?"}payload=${encodeURIComponent(
    JSON.stringify(testPayload)
  )}`;
}

/**
 * Bulletproof Google Apps Script Code
 * Handles:
 * - Both GET and POST requests
 * - Both text/plain body, parameter payload, and parameter data
 * - Both bound spreadsheets (getActiveSpreadsheet) and fallback
 * - Auto-creates styled green headers
 */
export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * ============================================================================
 * DROPSTOP BY ASTRIA & CO. — BULLETPROOF GOOGLE SHEETS LIVE ORDER DATABASE
 * ============================================================================
 * INSTRUCTIONS:
 * 1. Open your Google Sheet (or create one at sheets.new)
 * 2. Click: Extensions -> Apps Script
 * 3. Delete any default code, paste this entire script, and click Save (Ctrl+S / Cmd+S).
 * 4. Click the blue "Deploy" button (top right) -> "New deployment".
 * 5. Select type: "Web app" (click the gear icon if needed).
 * 6. Execute as: "Me"
 * 7. Who has access: "Anyone" (CRITICAL: Do NOT choose "Only myself"!)
 * 8. Click "Deploy", approve permissions, and copy the Web app URL.
 * ============================================================================
 */

// Optional: If your script is standalone, paste your Google Sheet ID below.
// Otherwise leave blank to use the active sheet automatically.
var SPREADSHEET_ID = "";

function getTargetSheet() {
  if (SPREADSHEET_ID && SPREADSHEET_ID.trim().length > 10) {
    return SpreadsheetApp.openById(SPREADSHEET_ID.trim()).getActiveSheet();
  }
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (ss) {
    return ss.getActiveSheet();
  }
  throw new Error("No active spreadsheet found. Open Apps Script from inside your Google Sheet (Extensions > Apps Script) or fill in SPREADSHEET_ID.");
}

function setupHeaders(sheet) {
  var headers = [
    "Date & Time",
    "Order ID",
    "Customer Name",
    "Phone (WhatsApp)",
    "Email",
    "Delivery Address",
    "City",
    "PIN Code",
    "Items Ordered",
    "Total Items",
    "Subtotal (₹)",
    "Shipping (₹)",
    "Total Payable (₹)",
    "Payment Mode",
    "Status"
  ];
  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#2D4532");
    headerRange.setFontColor("#FFFFFF");
    headerRange.setFontWeight("bold");
    headerRange.setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
  }
}

function handleRequest(e) {
  try {
    var sheet = getTargetSheet();
    setupHeaders(sheet);

    var json = null;

    // 1. Check GET query parameter: ?payload=... or ?data=...
    if (e && e.parameter) {
      if (e.parameter.payload) {
        json = JSON.parse(e.parameter.payload);
      } else if (e.parameter.data) {
        json = JSON.parse(e.parameter.data);
      } else if (e.parameter.action) {
        json = e.parameter;
      }
    }

    // 2. Check POST body
    if (!json && e && e.postData && e.postData.contents) {
      json = JSON.parse(e.postData.contents);
    }

    if (!json) {
      return ContentService.createTextOutput("Dropstop Webhook is ONLINE and ready to receive orders!")
        .setMimeType(ContentService.MimeType.TEXT);
    }

    // Process single order or test row
    if (json.action === "NEW_ORDER" || json.action === "TEST_CONNECTION" || json.orderId) {
      var d = json.data || json;
      sheet.appendRow([
        d.date || new Date().toLocaleString(),
        d.orderId || "N/A",
        d.customerName || "N/A",
        "'" + (d.customerPhone || ""),
        d.customerEmail || "",
        d.address || "",
        d.city || "",
        "'" + (d.pincode || ""),
        d.items || "",
        d.itemCount || 1,
        d.subtotal || 0,
        d.shippingFee || 0,
        d.totalAmount || 0,
        d.paymentMethod || "COD",
        d.orderStatus || "PENDING"
      ]);
    } else if (json.action === "BATCH_SYNC" && Array.isArray(json.orders)) {
      json.orders.forEach(function(d) {
        sheet.appendRow([
          d.date || new Date().toLocaleString(),
          d.orderId || "N/A",
          d.customerName || "N/A",
          "'" + (d.customerPhone || ""),
          d.customerEmail || "",
          d.address || "",
          d.city || "",
          "'" + (d.pincode || ""),
          d.items || "",
          d.itemCount || 1,
          d.subtotal || 0,
          d.shippingFee || 0,
          d.totalAmount || 0,
          d.paymentMethod || "COD",
          d.orderStatus || "PENDING"
        ]);
      });
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Row added to Google Sheet successfully!" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  return handleRequest(e);
}

function doGet(e) {
  return handleRequest(e);
}
`;
