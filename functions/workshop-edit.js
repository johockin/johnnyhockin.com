// Workshop Mode Content Editor Function
// Handles live content editing with GitHub API integration

const https = require('https');

exports.handler = async (event, context) => {
  // Enable CORS for all origins
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
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

  try {
    // Verify session token
    const authHeader = event.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'No valid session token provided' }),
      };
    }

    const sessionToken = authHeader.replace('Bearer ', '');
    const sessionData = JSON.parse(Buffer.from(sessionToken, 'base64').toString());

    // Check if session is expired
    if (!sessionData.workshopMode || Date.now() > sessionData.expires) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Session expired' }),
      };
    }

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

    if (event.httpMethod === 'POST') {
      const { contentType, elementId, newContent, originalContent } = JSON.parse(event.body);

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
      const validContentTypes = ['explorer-log', 'project-title', 'project-description', 'project-table-title', 'project-table-description'];
      if (!validContentTypes.includes(contentType)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid content type' }),
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