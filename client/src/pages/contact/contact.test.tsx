import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../tests/render-with-providers';
import { Contact } from './contact';

test('contains link robs email', async () => {
  renderWithProviders(Contact);

  expect(
    screen.getByRole('link', {
      name: 'rmwfer@essex.ac.uk',
    })
  ).toHaveAttribute('href', 'mailto:rmwfer@essex.ac.uk');
});

test('contains link robs profile', async () => {
  renderWithProviders(Contact);

  expect(
    screen.getByRole('link', {
      name: 'View university profile',
    })
  ).toHaveAttribute(
    'href',
    'https://www.essex.ac.uk/people/FERGU10501/Robert-Ferguson'
  );
});
