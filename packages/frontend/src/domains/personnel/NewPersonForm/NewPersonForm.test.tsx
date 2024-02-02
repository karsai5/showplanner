import "@testing-library/jest-dom/extend-expect";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { api } from "core/api";
import React from "react";

import NewPersonForm from "./NewPersonForm";

jest.mock("core/api");

const queryClient = new QueryClient();


const firstName = "First";
const lastName = "Last";
const preferredName = "Preffered name";
const phone = "0444 444 444";
const dob = "1999-09-09"
const allergies = "None";
const emergencyName = "Emergency name"
const emergencyPhone = "0466 666 666"
const emergencyRelation = "Emergency relation"

const fillInDefaultValues = async (user: UserEvent) => {
  return act(async () => {
    await user.type(screen.getByPlaceholderText(/First name/i), firstName)
    await user.type(screen.getByPlaceholderText(/Last name/i), lastName)
    await user.type(screen.getByPlaceholderText(/Preferred name/i), preferredName)
    await user.type(screen.getAllByPlaceholderText(/Phone/i)[0], phone)

    fireEvent.change(screen.getByLabelText(/Date of birth/i), { target: { value: dob } });
    await user.type(screen.getByPlaceholderText(/Allergies/i), allergies)

    await user.type(screen.getByLabelText(/Emergency contact name/i), emergencyName)
    await user.type(screen.getByLabelText(/Emergency contact phone/i), emergencyPhone)
    await user.type(screen.getByLabelText(/RElationship to emergency contact/i), emergencyRelation)
  })
}

describe("<NewPersonForm />", () => {
  beforeEach(() => {
    (api.mePost as jest.Mock).mockClear();
  });
  test("it should mount", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NewPersonForm />
      </QueryClientProvider>
    );

    const newPersonForm = screen.getByTestId("NewPersonForm");

    expect(newPersonForm).toBeInTheDocument();
  });

  it("it should allow the user to fill in their own pronoun", async () => {
    const customPronoun = "Xi/Xe";

    const user = userEvent.setup()
    render(
      <QueryClientProvider client={queryClient}>
        <NewPersonForm />
      </QueryClientProvider>
    );

    await fillInDefaultValues(user);

    await act(async () => {
      await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Pronoun' }), 'Other');
      await user.type(screen.getByPlaceholderText(/Pronoun/i), customPronoun)
      await user.click(screen.getByRole('button', { name: 'Save' }));
    })

    await waitFor(() => expect(api.mePost).toBeCalledWith({
      "personalDetails": {
        "allergies": "None",
        "dob": "1999-09-09",
        "emergencyName": "Emergency name",
        "emergencyPhone": "0404 666 666",
        "emergencyRelationship": "Emergency relation",
        "firstName": "First",
        "hearAboutUs": "",
        "lastName": "Last",
        "phone": "0404 444 444",
        "preferredName": "Preffered name",
        "previousWork": "",
        "pronoun": customPronoun,
        "reasonForCrewing": "",
        "wwc": "",
      }
    }))
  });
  test("it should map details correctly", async () => {

    const user = userEvent.setup()
    render(
      <QueryClientProvider client={queryClient}>
        <NewPersonForm />
      </QueryClientProvider>
    );

    await fillInDefaultValues(user);
    await act(() => user.click(screen.getByRole('button', { name: 'Save' })));

    await waitFor(() => expect(api.mePost).toBeCalledWith({
      "personalDetails": {
        "allergies": "None",
        "dob": "1999-09-09",
        "emergencyName": "Emergency name",
        "emergencyPhone": "0404 666 666",
        "emergencyRelationship": "Emergency relation",
        "firstName": "First",
        "hearAboutUs": "",
        "lastName": "Last",
        "phone": "0404 444 444",
        "preferredName": "Preffered name",
        "previousWork": "",
        "pronoun": "She/Her",
        "reasonForCrewing": "",
        "wwc": "",
      }
    }));
  });
});
