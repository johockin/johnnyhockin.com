// Workshop Mode Content Editor Function
// Handles live content editing and data.json persistence

const fs = require('fs').promises;
const path = require('path');

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
      // Return current data.json content
      try {
        const dataPath = path.join(process.cwd(), 'data.json');
        const dataContent = await fs.readFile(dataPath, 'utf8');
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            data: JSON.parse(dataContent),
          }),
        };
      } catch (error) {
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'Failed to read data file' }),
        };
      }
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

      // Read current data.json
      const dataPath = path.join(process.cwd(), 'data.json');
      let siteData;
      
      try {
        const dataContent = await fs.readFile(dataPath, 'utf8');
        siteData = JSON.parse(dataContent);
      } catch (error) {
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'Failed to read data file' }),
        };
      }

      // Update content based on type
      let updated = false;

      if (contentType === 'explorer-log' && elementId.startsWith('log-')) {
        // Find and update explorer log entry
        const logEntry = siteData.explorerLog.find(entry => entry.id === elementId);
        if (logEntry) {
          logEntry.content = newContent;
          updated = true;
        }
      } else if (contentType === 'project-title' || contentType === 'project-description') {
        // Find and update project content
        const projectId = elementId.replace(/-(title|description)$/, '');
        const project = siteData.projects?.find(p => p.id === projectId);
        if (project) {
          if (contentType === 'project-title') {
            project.title = newContent;
          } else {
            project.description = newContent;
          }
          updated = true;
        }
      }

      if (!updated) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Content not found' }),
        };
      }

      // Write updated data back to file
      try {
        await fs.writeFile(dataPath, JSON.stringify(siteData, null, 2), 'utf8');
        
        // Also update the embedded data file
        const embeddedPath = path.join(process.cwd(), 'data-embedded.js');
        const embeddedContent = `// Auto-generated embedded data fallback
// Generated: ${new Date().toISOString()}
// DO NOT EDIT MANUALLY - Use data.json and sync-embedded-data.js

window.embeddedSiteData = ${JSON.stringify(siteData, null, 2)};`;
        
        await fs.writeFile(embeddedPath, embeddedContent, 'utf8');

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Content updated successfully',
            timestamp: Date.now(),
          }),
        };
      } catch (error) {
        console.error('Failed to write data file:', error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'Failed to save changes' }),
        };
      }
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