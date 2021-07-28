import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { replaceCamelWithSpaces } from "./App";

//https://www.w3.org/TR/wai-aria/#role_definitions
//https://github.com/testing-library/jest-dom

test("button has correct initial color", () => {
  //render method creates virtual DOM for whatever JSX you give it. You access it with the screen global object.
  render(<App />);
  //name is the display text
  //find an element with a role of button and text of 'change to blue'
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  //expect the background color to be red. This is our assertion:
  //assertion is what causes test to fail or pass. If error, test fails.
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });

  //click button
  //fireEvent will help us interact with elements in our virtual DOM
  fireEvent.click(colorButton);

  //expect the background color to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });

  //expect the button text to be 'change to red'
  expect(colorButton.textContent).toBe("Change to Medium Violet Red");
});

test("initial conditions", () => {
  render(<App />);

  //check that the button starts out enabled
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  expect(colorButton).toBeEnabled();

  //check that the checkbox starts out unchecked
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

//New test : check that when checkbox checked, button is disabled
test("conditions after checkbox checked", () => {
  render(<App />);

  //get elements
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  //click button
  fireEvent.click(checkbox);

  //expect button to be disabled
  expect(colorButton).toBeDisabled();

  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
});

//New test : check button is gray when disabled - part 1
test("Disabled button has gray background and reverts to red", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  //disable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle("background-color: gray");

  //re-enable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle("background-color: MediumVioletRed");
});

//New test : check button is gray when disabled - part 2
test("Clicked disabled button has gray background and reverts to Midnight Blue", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  //change button to Midnight Blue
  fireEvent.click(colorButton);

  // disable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle("background-color: gray");

  // re-enable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle("background-color: MidnightBlue");
});

//testing particular unit function - only used for complicated functions
//describe used to group tests into logical groups
describe("spaces before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });
  test("Works for one inner capital letter", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });
  test("Works for multiple capital letters", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
