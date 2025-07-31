// Workshop Mode Authentication Function
// Handles PIN verification and session token generation

const crypto = require('crypto');

exports.handler = async (event, context) => {
  // Enable CORS for all origins
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Max-Age': '86400',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { pin } = JSON.parse(event.body);

    if (!pin) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'PIN is required' }),
      };
    }

    // Get the expected PIN hash from environment variables
    const expectedHash = process.env.WORKSHOP_PIN_HASH;
    
    if (!expectedHash) {
      console.error('WORKSHOP_PIN_HASH environment variable not set');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Authentication system not configured' }),
      };
    }

    // Hash the provided PIN
    const providedHash = crypto.createHash('sha256').update(pin).digest('hex');

    // Verify PIN
    if (providedHash !== expectedHash) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid PIN' }),
      };
    }

    // Generate session token (valid for 24 hours)
    const payload = {
      workshopMode: true,
      timestamp: Date.now(),
      expires: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
    };

    const sessionToken = Buffer.from(JSON.stringify(payload)).toString('base64');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        sessionToken,
        expires: payload.expires,
      }),
    };

  } catch (error) {
    console.error('Workshop auth error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Authentication failed' }),
    };
  }
};