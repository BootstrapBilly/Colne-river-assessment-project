import {
  ElementType,
  ComponentPropsWithoutRef,
  PropsWithChildren,
} from 'react';
import classNames from 'classnames';

type SectionProps<T extends ElementType> = PropsWithChildren<{
  as?: T;
  className?: string;
}> &
  ComponentPropsWithoutRef<T>;

export const Section = <T extends ElementType = 'section'>({
  as,
  children,
  className,
  ...restProps
}: SectionProps<T>) => {
  const Component = as || 'section';
  return (
    <Component
      className={classNames(
        'p-2 sm:px-10 sm:py-4 2xl:mx-auto 2xl:w-[1500px]',
        className
      )}
      {...restProps}
    >
      {children}
    </Component>
  );
};
