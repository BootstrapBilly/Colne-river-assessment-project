import { ChevronRightIcon } from '@heroicons/react/24/solid';

export const AboutIpadPortrait = () => (
  <>
    <div className="flex flex-col space-y-4">
      <p>
        As widely publicized, our waterways are under immense stress from
        pollution which is exacerbated by climate change.
      </p>
      <p>
        Over the past year, we have been collecting regular samples from the
        (Colne, Stour, and Tollesbury), measuring levels of E. coli and
        Enterococcus. These microbes are indicators of water quality and are
        used by the UK Government to determine bathing water status.
      </p>
      <p>
        Your support is crucial in helping us achieve these goals and protect
        our waterways for future generations.
      </p>
    </div>
    <div className="mt-12">
      <a
        className="mx-8 flex items-center justify-between bg-orange-400 p-4 text-lg"
        href={'https://click.hubbub.net/p/CRAP2024/'}
      >
        Learn More About the Project & Support Our Cause
        <ChevronRightIcon className="h-6 shrink-0" />
      </a>
    </div>
  </>
);
