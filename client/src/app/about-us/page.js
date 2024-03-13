import { Suspense } from 'react';
import AboutUsVideo from '@/app/_components/AboutUsVideo';
import VideoSkeleton from '@/app/_components/VideoSkeleton';
import styles from '@/app/_styles/aboutUsPage.module.css';

export default function AboutUsPage() {
   return (
      <main className={styles['about-us-page']}>
         <Suspense fallback={ <VideoSkeleton /> }>
            <AboutUsVideo />
         </Suspense>

         <h1>About Us</h1>

         <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum a arcu cursus vitae congue mauris rhoncus aenean. Lacinia quis vel eros donec ac odio. Tortor dignissim convallis aenean et tortor at. Parturient montes nascetur ridiculus mus mauris vitae. Etiam erat velit scelerisque in dictum non consectetur a erat. Sagittis eu volutpat odio facilisis. Dictum non consectetur a erat nam at lectus. Erat nam at lectus urna duis. At risus viverra adipiscing at in. Tincidunt tortor aliquam nulla facilisi cras.
         </p>

         <p>
            Et molestie ac feugiat sed. Facilisis gravida neque convallis a. Donec adipiscing tristique risus nec feugiat in fermentum posuere. Vitae proin sagittis nisl rhoncus mattis rhoncus urna neque. Fringilla ut morbi tincidunt augue interdum. Dolor sit amet consectetur adipiscing elit duis tristique. Arcu non sodales neque sodales ut etiam. Sit amet facilisis magna etiam tempor orci eu lobortis. Malesuada bibendum arcu vitae elementum curabitur vitae nunc. Enim sed faucibus turpis in eu mi bibendum. Nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices. Et tortor consequat id porta nibh venenatis cras sed.
         </p>   

         <p>
            Odio tempor orci dapibus ultrices. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Adipiscing tristique risus nec feugiat in fermentum. Facilisi nullam vehicula ipsum a arcu cursus vitae congue mauris. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Nisi est sit amet facilisis magna etiam tempor orci. Pharetra magna ac placerat vestibulum lectus mauris ultrices eros. Pellentesque dignissim enim sit amet venenatis urna cursus. Imperdiet dui accumsan sit amet nulla. Dictumst vestibulum rhoncus est pellentesque elit. Eu facilisis sed odio morbi. Quis auctor elit sed vulputate. Sit amet volutpat consequat mauris nunc congue nisi vitae. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Amet consectetur adipiscing elit pellentesque.
         </p>  

         <p>
            Malesuada proin libero nunc consequat interdum. Est lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur libero id faucibus nisl tincidunt eget nullam non nisi. Erat velit scelerisque in dictum non. Auctor eu augue ut lectus arcu. Pretium lectus quam id leo in vitae. Quam nulla porttitor massa id neque aliquam vestibulum morbi blandit. Interdum varius sit amet mattis vulputate enim. Amet aliquam id diam maecenas ultricies mi eget mauris pharetra. Nisi est sit amet facilisis magna. Etiam dignissim diam quis enim lobortis scelerisque fermentum. Blandit turpis cursus in hac habitasse. Potenti nullam ac tortor vitae purus faucibus. Aliquet risus feugiat in ante metus. Leo vel orci porta non. Odio ut sem nulla pharetra diam.
         </p>
      </main>
   );
};