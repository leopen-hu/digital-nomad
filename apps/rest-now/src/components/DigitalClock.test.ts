import { render } from '@testing-library/vue'
import DigitalClock from './DigitalClock.vue'

describe('ExampleComponent', () => {
  it('renders correctly', () => {
    const { getByText } = render(DigitalClock)
    getByText('File')
  })
})
