"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "./components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PasswordGeneratorForm {
  passwordLength: number;
  includeLowercase: boolean;
  includeUppercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

const PasswordGenerator = () => {
  const { register, handleSubmit } = useForm<PasswordGeneratorForm>();
  const [generatedPassword, setGeneratedPassword] = useState("");

  const generatePassword = ({
    passwordLength,
    includeLowercase,
    includeUppercase,
    includeNumbers,
    includeSymbols,
  }: PasswordGeneratorForm) => {
    const LowercaseChars = "qwertyuiopasdfghjklzxcvbnm";
    const UppercaseChars = "QWERTYUIOPASDFGHJKLZXCVBNM";
    const NumberChars = "01234567890123456789";
    const SymbolsChars = "!@#$%^&*()_+-={[]}:<>?";

    let allowedChars = "";
    allowedChars += includeLowercase ? LowercaseChars : "";
    allowedChars += includeUppercase ? UppercaseChars : "";
    allowedChars += includeNumbers ? NumberChars : "";
    allowedChars += includeSymbols ? SymbolsChars : "";

    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * allowedChars.length);
      password += allowedChars[randomIndex];
    }

    setGeneratedPassword(password);
    if (password.length > 16) {
      setGeneratedPassword("The length must be < 16");
    }
    if (password.length < 6) {
      setGeneratedPassword("The length must be > 6");
    }
    if (allowedChars.length === 0) {
      setGeneratedPassword("You must select an option");
    }
  };

  return (
    <div>
      <div className="p-5 flex flex-row-reverse">
        <ModeToggle />
      </div>
      <div className="flex justify-center">
        <Card className="p-10">
          <CardHeader>
            <CardTitle className="text-center">Password Generator</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit(generatePassword)}>
            <label className="mr-3 ">Password Length Min-6 Max-16</label>
            <Input
              type="number"
              placeholder="Enter the length"
              {...register("passwordLength", { value: 12 })}
              className="bg-slate-200 rounded-md p-2 dark:bg-gray-50 dark:text-gray-900 mt-2 mb-2 "
            />

            <div className="inline-flex gap-2 ">
              <input
                type="checkbox"
                {...register("includeLowercase", { value: true })}
              />
              <label>Include Lowercase </label>
            </div>
            <br />
            <div className="inline-flex gap-2 ">
              <input
                type="checkbox"
                {...register("includeUppercase", { value: true })}
              />
              <label>Include Uppercase </label>
            </div>

            <br />
            <div className="inline-flex gap-2 ">
              <input
                type="checkbox"
                {...register("includeNumbers", { value: true })}
              />
              <label>Include Numbers</label>
            </div>
            <br />
            <div className="inline-flex gap-2 ">
              <input
                type="checkbox"
                {...register("includeSymbols", { value: true })}
              />
              <label>Include Symbols</label>
            </div>
            <br />
            <Button type="submit" className="mt-2 mb-2 px-20">
              Generate Password
            </Button>
          </form>
          <p
            className={`text-center text-2xl ${
              generatedPassword.length < 6 || generatedPassword.length > 16
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            
            {generatedPassword}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default PasswordGenerator;
