import { render, screen } from '../../../util/test-utils'
import { Home } from '../Home'

describe("Home", () => {
  it ("renders without crashing", () => {
    render(<Home />);
    const heading = screen.getByText('Welcome to Trivia-Creator™')
    expect(heading).toBeInTheDocument()
  })
})