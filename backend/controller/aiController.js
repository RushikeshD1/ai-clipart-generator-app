export const generateStyledImage = async (req, res) => {

  try {
    const { prompt, userImage } = req.body;

    if (!prompt) return res.status(400).json({ message: 'Prompt is required' });

    const CF_ACCOUNT_ID = process.env.CF_ACCOUNT_ID;
    const CF_API_TOKEN  = process.env.CF_API_TOKEN;
    const CF_URL        = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/ai/run/@cf/runwayml/stable-diffusion-v1-5-img2img`;

    const requestBody = {
      prompt,
      negative_prompt: 'blurry, distorted eyes, distorted face, extra limbs, deformed, low quality',
      strength:        0.4359,
      guidance:        7.5,
      num_steps:       20,
    };

    if (userImage) {      
      requestBody.image_b64 = userImage.includes(',')
        ? userImage.split(',')[1] 
        : userImage;              
    }

    const cfResponse = await fetch(CF_URL, {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${CF_API_TOKEN}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!cfResponse.ok) {
      const errText = await cfResponse.text();
      console.error('Cloudflare error:', errText);
      return res.status(cfResponse.status).json({ message: errText });
    }

    const arrayBuffer = await cfResponse.arrayBuffer();
    const base64      = Buffer.from(arrayBuffer).toString('base64');

    // Return as data URI so React Native <Image> can use it directly
    res.json({ uri: `data:image/png;base64,${base64}` });

  } catch (error) {
    console.error('Controller error:', error.message);
    res.status(500).json({ message: error.message || 'Image generation failed' });
  }
};