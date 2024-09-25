import { createLazyFileRoute } from '@tanstack/react-router';
import { AboutMobile } from '../../pages/about/mobile/about.mobile';
import { About } from '../../pages/about/desktop/about';

export const Route = createLazyFileRoute('/')({
  component: () => (
    <>
      <AboutMobile />
      <About />
    </>
  ),
});
