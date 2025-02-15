import {render} from '@testing-library/vue';
import MainMenu from './MainMenu.vue';

describe('ExampleComponent', () => {
  it('renders correctly', () => {
    const {getByText} = render(MainMenu)
    getByText('File')
  })
})
