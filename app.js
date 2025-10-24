import express from 'express';
import ytdl from 'ytdl-core';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/downloader/ytv', async (req, res) => {
  const videoURL = req.query.url;
  if (!videoURL || !ytdl.validateURL(videoURL)) {
    return res.status(400).json({ status: false, message: 'Invalid YouTube URL' });
  }

  try {
    const info = await ytdl.getInfo(videoURL);
    const title = info.videoDetails.title.replace(/[/\\?%*:|"<>]/g, '-');
    const downloadURL = `https://download.example.com/?video=${encodeURIComponent(videoURL)}`;

    res.json({
      status: true,
      creator: 'YourName or API',
      data: {
        title: title,
        url: downloadURL,
      },
    });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Error processing video' });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
