import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ContactForm from './ContactForm';
import { act } from 'react-dom/test-utils';

// test("test test", () => {});

test("Are labels visible", () => {
    const { getByText } = render(<ContactForm />);

    const firstNameLabel = getByText(/First Name*/i); 
    const lastNameLabel = getByText(/Last Name*/i);
    const emailLabel = getByText(/Email*/i);
    const messageLabel = getByText(/Message/i);

    expect(firstNameLabel).toBeVisible();
    expect(lastNameLabel).toBeVisible();
    expect(emailLabel).toBeVisible();
    expect(messageLabel).toBeVisible();
})

test("Are inputs visible", () => {
    const { getByLabelText } = render(<ContactForm />);

    const firstNameInput = getByLabelText(/First Name*/i);
    const lastNameInput = getByLabelText(/Last Name*/i);
    const emailInput = getByLabelText(/Email*/i);
    const messageInput = getByLabelText(/Message/i);

    expect(firstNameInput).toBeVisible();
    expect(lastNameInput).toBeVisible();
    expect(emailInput).toBeVisible();
    expect(messageInput).toBeVisible();
})

test("Can you type in the inputs", () => {
    
    const { getByLabelText, getByTestId, findByTestId } = render(<ContactForm />);

    const firstNameInput = getByLabelText(/First Name*/i);
    const lastNameInput = getByLabelText(/Last Name*/i);
    const emailInput = getByLabelText(/Email*/i);
    const messageInput = getByLabelText(/Message/i);

    act(() => {
    fireEvent.change(firstNameInput, { target: { value: 'Rodrigo' } });
    fireEvent.change(lastNameInput, { target: { value: 'De La Mora' } });
    fireEvent.change(emailInput, { target: { value: 'delamorarodrigo3141@yahoo.com' } });
    fireEvent.change(messageInput, { target: { value: 'This is my contact info' } });
    })

    expect(firstNameInput.value).toBe('Rodrigo');
    expect(lastNameInput.value).toBe('De La Mora');
    expect(emailInput.value).toBe('delamorarodrigo3141@yahoo.com');
    expect(messageInput.value).toBe('This is my contact info');

    const submitButton = getByTestId("submitButton");
    async () => {
        act(async () => {
            fireEvent.click(submitButton);
            
            const formData =  await findByTestId("preData")
            
            expect(formData).toBeInTheDocument();
        })
    }
})

// test("Can you click the submit button", () => {
//     const { queryByTestId, getByTestId } = render(<ContactForm />);

//     const submitButton = getByTestId("submitButton");

//     fireEvent.click(submitButton);

//     const formData = queryByTestId("preData");

//     expect(formData).waitForElement().toBeInTheDocument();
// })

// test("Can you click the submit button", () => {
//         const { queryByTestId, getByTestId } = render(<ContactForm />);
    
//         const submitButton = getByTestId("submitButton");
    
//         fireEvent.click(submitButton);
    
//         const formData = await waitForElement(() => {
//             queryByTestId("preData")
//         })
    
//         expect(formData).toBeInTheDocument();
//     })