export default function AboutUsVideo() {
   return (
      <iframe 
         src={process.env.NEXT_PUBLIC_ABOUT_US_VIDEO_URL} 
         title="About Us video" frameborder="0" 
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share" 
         allowfullscreen
      >
      </iframe>
   );
};