"use client";

import React from "react";
import SubmitButton from "./SubmitButton";
import { updateGuest } from "../_lib/action";
import { useState } from "react";
import CountrySelectClient from "./CountrySelectClient";

export default function UpdateProfileForm({ guest, countries }) {
  const [formData, setFormData] = useState({
    fullName: guest.fullName ?? "",
    email: guest.email ?? "",
    nationalID: guest.nationalID ?? "",
    nationality: guest.nationality ?? "",
  });

  const hasChanges =
    formData.fullName !== (guest.fullName ?? "") ||
    formData.nationality !== (guest.nationality ?? "") ||
    formData.email !== (guest.email ?? "") ||
    formData.nationalID !== (guest.nationalID ?? "");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const { fullName, email, nationality, nationalID } = guest;

  return (
    <form
      action={updateGuest}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          name="fullName"
          defaultValue={fullName}
          onChange={handleChange}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          name="email"
          defaultValue={email}
          onChange={handleChange}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
        </div>
        <CountrySelectClient
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={nationality}
          options={countries}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          id="nationalID"
          defaultValue={nationalID || ""}
          name="nationalID"
          onChange={handleChange}
          className={`px-5 py-3 w-full shadow-sm rounded-sm ${
            nationalID
              ? "cursor-not-allowed bg-gray-600 text-gray-400"
              : "bg-white text-gray-900"
          }`}
        />
      </div>
      <SubmitButton pendingLabel="Updating..." disabled={!hasChanges}>
        Update profile
      </SubmitButton>
      <div className="flex justify-end items-center gap-6"></div>
    </form>
  );
}
