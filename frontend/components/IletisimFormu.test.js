import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import IletisimFormu from "./IletisimFormu";
import App from "../App";

test("hata olmadan render ediliyor", () => {
  render(<App />);
});

test("iletişim formu headerı render ediliyor", () => {
  render(<App />);
  const formHeader = screen.getByText("Entegrasyon Test Projesi");
  expect(formHeader).toBeInTheDocument();
});

test("kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.", async () => {
  render(<App />);

  const usernameInput = screen.getByLabelText("Ad*");
  userEvent.type(usernameInput, "abc");
  userEvent.click(screen.getByText("Gönder"));

  await waitFor(() => {
    const errorMessage = screen.getByLabelText("Ad*").nextElementSibling;
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("ad en az 5 karakter olmalıdır.");
  });
});

test("kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.", async () => {
  render(<App />);

  const submitButton = screen.getByText("Gönder");
  userEvent.click(submitButton);

  await waitFor(() => {
    const nameError = screen.getByLabelText("Ad*").nextElementSibling;
    expect(nameError).toBeInTheDocument();
    expect(nameError).toHaveTextContent("en az 5 karakter olmalıdır.");

    const surnameError = screen.getByLabelText("Soyad*").nextElementSibling;
    expect(surnameError).toBeInTheDocument();
    expect(surnameError).toHaveTextContent("gereklidir.");

    const emailError = screen.getByLabelText("Email*").nextElementSibling;
    expect(emailError).toBeInTheDocument();
    expect(emailError).toHaveTextContent("geçerli bir email adresi olmalıdır.");
  });
});

test("kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.", async () => {
  render(<App />);

  const submitButton = screen.getByText("Gönder");
  userEvent.type(screen.getByLabelText("Ad*"), "Samet");
  userEvent.type(screen.getByLabelText("Soyad*"), "Öztürk");

  userEvent.click(submitButton);

  await waitFor(() => {
    const emailError = screen.getByLabelText("Email*").nextElementSibling;
    expect(emailError).toBeInTheDocument();
    expect(emailError).toHaveTextContent("geçerli bir email adresi olmalıdır.");
  });
});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
  render(<App />);

  const submitButton = screen.getByText("Gönder");
  userEvent.type(screen.getByLabelText("Email*"), "gecersizEmail");

  userEvent.click(submitButton);

  await waitFor(() => {
    const emailError = screen.getByLabelText("Email*").nextElementSibling;
    expect(emailError).toBeInTheDocument();
    expect(emailError).toHaveTextContent("geçerli bir email adresi olmalıdır.");
  });
});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
  render(<App />);

  const submitButton = screen.getByText("Gönder");
  userEvent.type(screen.getByLabelText("Ad*"), "John");

  userEvent.click(submitButton);

  await waitFor(() => {
    const surnameError = screen.getByLabelText("Soyad*").nextElementSibling;
    expect(surnameError).toBeInTheDocument();
    expect(surnameError).toHaveTextContent("gereklidir.");
  });
});

test("ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.", async () => {});

test("form gönderildiğinde girilen tüm değerler render ediliyor.", async () => {});
