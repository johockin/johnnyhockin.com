// Workshop Mode Content Editor Function
// Handles live content editing with GitHub API integration

const https = require('https');

exports.handler = async (event, context) => {
  // Enable CORS for all origins
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Max-Age': '86400',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
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

  // Add comprehensive error handling
  try {
    console.log('Workshop Edit Function called:', {
      method: event.httpMethod,
      headers: event.headers,
      bodyLength: event.body ? event.body.length : 0,
    });

    // Handle GET requests without authentication
    if (event.httpMethod === 'GET') {
      // For now, return success - data reading handled by frontend
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Workshop Mode data access available',
        }),
      };
    }

    // Verify session token - check multiple header case variations
    const authHeader = event.headers.authorization || 
                      event.headers.Authorization || 
                      event.headers['authorization'] ||
                      event.headers['Authorization'];
    console.log('Auth header:', authHeader);
    console.log('All headers:', Object.keys(event.headers));
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No valid authorization header found');
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'No valid session token provided' }),
      };
    }

    const sessionToken = authHeader.replace('Bearer ', '');
    console.log('Session token received:', {
      tokenLength: sessionToken.length,
      tokenStart: sessionToken.substring(0, 20),
      tokenEnd: sessionToken.substring(sessionToken.length - 20),
      isBase64: /^[A-Za-z0-9+/]+=*$/.test(sessionToken)
    });

    // Validate token format before decoding
    if (!sessionToken || sessionToken.length < 20) {
      console.log('Token too short or missing');
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid token format' }),
      };
    }

    // Parse session token with error handling
    let sessionData;
    try {
      const decodedString = Buffer.from(sessionToken, 'base64').toString();
      console.log('Decoded token string:', decodedString);
      
      sessionData = JSON.parse(decodedString);
      console.log('Session data parsed:', {
        workshopMode: sessionData.workshopMode,
        timestamp: sessionData.timestamp,
        expires: sessionData.expires,
        expiresDate: new Date(sessionData.expires),
        currentTime: Date.now(),
        currentDate: new Date(),
        isExpired: Date.now() > sessionData.expires,
        timeRemaining: sessionData.expires - Date.now()
      });
    } catch (tokenError) {
      console.error('Session token parsing error:', tokenError);
      console.error('Raw token:', sessionToken);
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid session token format' }),
      };
    }

    // Check if session is expired
    if (!sessionData.workshopMode || Date.now() > sessionData.expires) {
      console.log('Session expired or invalid');
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Session expired' }),
      };
    }

    if (event.httpMethod === 'POST') {
      // Parse JSON body with error handling
      let requestData;
      try {
        requestData = JSON.parse(event.body);
        console.log('Parsed request data:', requestData);
      } catch (parseError) {
        console.error('JSON parsing error:', parseError);
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid JSON in request body' }),
        };
      }

      const { contentType, elementId, newContent, originalContent } = requestData;

      if (!contentType || !elementId || newContent === undefined) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Missing required fields' }),
        };
      }

      // For MVP: Log the change and return success
      // In production, this would integrate with GitHub API or a database
      console.log('Workshop Mode Edit Request:', {
        contentType,
        elementId,
        newContent: newContent.substring(0, 100) + (newContent.length > 100 ? '...' : ''),
        originalContent: originalContent.substring(0, 100) + (originalContent.length > 100 ? '...' : ''),
        timestamp: new Date().toISOString(),
      });

      // Validate content type and element ID format
      const validContentTypes = [
        'explorer-log', 
        'explorer-log-date',
        'project-title', 
        'project-description', 
        'project-table-title', 
        'project-table-description',
        'section-title',
        'text'
      ];
      
      if (!validContentTypes.includes(contentType)) {
        console.log('Invalid content type received:', contentType);
        console.log('Valid types:', validContentTypes);
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ 
            error: 'Invalid content type',
            received: contentType,
            validTypes: validContentTypes
          }),
        };
      }

      // Simulate successful save for MVP
      // TODO: Implement GitHub API integration for actual persistence
      const githubToken = process.env.GITHUB_TOKEN;
      if (githubToken) {
        console.log('GitHub token available - would commit change to repository');
        // Future: Call GitHub API to update data.json
      } else {
        console.log('No GitHub token - storing change in function logs only');
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Content change recorded successfully',
          timestamp: Date.now(),
          elementId,
          contentType,
          note: 'Changes are currently logged. GitHub integration coming soon.',
        }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };

  } catch (error) {
    console.error('Workshop edit error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};