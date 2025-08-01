// Debug token format - temporary function for testing
exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // Show raw authorization header
    const authHeader = event.headers.authorization || 
                      event.headers.Authorization || 
                      event.headers['authorization'] ||
                      event.headers['Authorization'];
    
    console.log('Debug token test:', {
      method: event.httpMethod,
      authHeader: authHeader,
      allHeaders: Object.keys(event.headers),
      rawHeaders: event.headers
    });
    
    if (!authHeader) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          error: 'No auth header found',
          availableHeaders: Object.keys(event.headers)
        })
      };
    }
    
    if (!authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          error: 'Not Bearer token',
          authHeader: authHeader
        })
      };
    }
    
    const token = authHeader.replace('Bearer ', '');
    console.log('Raw token:', token);
    
    // Test base64 decoding
    let decodedString;
    try {
      decodedString = Buffer.from(token, 'base64').toString();
      console.log('Decoded string:', decodedString);
    } catch (decodeError) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          error: 'Base64 decode failed',
          token: token,
          error_details: decodeError.message
        })
      };
    }
    
    // Test JSON parsing
    let parsed;
    try {
      parsed = JSON.parse(decodedString);
      console.log('Parsed JSON:', parsed);
    } catch (parseError) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          error: 'JSON parse failed',
          decodedString: decodedString,
          error_details: parseError.message
        })
      };
    }
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        tokenLength: token.length,
        decodedLength: decodedString.length,
        parsed: parsed,
        timestamp: Date.now()
      })
    };
    
  } catch (error) {
    console.error('Debug token error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};