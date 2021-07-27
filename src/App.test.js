import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

//https://www.w3.org/TR/wai-aria/#role_definitions
//https://github.com/testing-library/jest-dom

test("button has correct initial color", () => {
  //render method creates virtual DOM for whatever JSX you give it. You access it with the screen global object.
  render(<App />);
  //name is the display text
  //find an element with a role of button and text of 'change to blue'
  const colorButton = screen.getByRole("button", { name: "Change to blue" });

  //expect the background color to be red. This is our assertion:
  //assertion is what causes test to fail or pass. If error, test fails.
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });

  //click button
  //fireEvent will help us interact with elements in our virtual DOM
  fireEvent.click(colorButton);

  //expect the background color to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });

  //expect the button text to be 'change to red'
  expect(colorButton.textContent).toBe("Change to red");
});

test("initial conditions", () => {
  render(<App />);

  //check that the button starts out enabled
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  expect(colorButton).toBeEnabled();

  //check that the checkbox starts out unchecked
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

//New test : check that when checkbox checked, button is disabled
test("conditions after checkbox checked", () => {
  render(<App />);

  //get elements
  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");

  //click button
  fireEvent.click(checkbox);

  //expect button to be disabled
  expect(button).toBeDisabled();

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
});
