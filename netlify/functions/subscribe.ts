import { Handler } from '@netlify/functions';

interface SubscribeBody {
  email: string;
}

export const handler: Handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  try {
    const { email } = JSON.parse(event.body || '{}') as SubscribeBody;

    // Validate email
    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Valid email is required' }),
      };
    }

    // Here you would typically:
    // 1. Store the email in your database
    // 2. Add to your email marketing service
    // 3. Send a welcome email
    
    // For now, we'll just log it (you can see this in Netlify's function logs)
    console.log('New subscription:', email);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Successfully subscribed!' }),
    };
  } catch (error) {
    console.error('Subscription error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
}; 