const videoPlayer = document.getElementById('videoPlayer');
const downloadBtn = document.getElementById('downloadBtn');
const nextBtn = document.getElementById('nextBtn');
const commentInput = document.getElementById('commentInput');
const submitComment = document.getElementById('submitComment');
const commentsList = document.getElementById('commentsList');

// Simulated video list
const videos = [
    'https://example.com/video1.mp4',
    'https://example.com/video2.mp4',
    'https://example.com/video3.mp4'
];
let currentVideoIndex = 0;

// Download button functionality
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = videoPlayer.src;
    link.download = 'video.mp4';
    link.click();
});

// Next video functionality
nextBtn.addEventListener('click', () => {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    videoPlayer.src = videos[currentVideoIndex];
    videoPlayer.play();
});

// Comment submission
submitComment.addEventListener('click', () => {
    const comment = commentInput.value.trim();
    if (comment) {
        const commentElement = document.createElement('p');
        commentElement.textContent = comment;
        commentsList.prepend(commentElement);
        commentInput.value = '';
    }
});