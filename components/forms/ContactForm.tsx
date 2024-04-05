"use client";

import { helpers } from "@/lib/utils";
import { contactValidation } from "@/lib/validations/contact.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "@nextui-org/react";
import axios from "axios";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type ContactFormT = z.infer<typeof contactValidation>;

interface ContactFormProps {
  userData: { email: string; name: string; mobile: string };
}

const ContactForm: React.FC<ContactFormProps> = ({ userData }) => {
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    resetField,
  } = useForm<ContactFormT>({
    resolver: zodResolver(contactValidation),
    defaultValues: {
      name: userData.name,
      mobile: userData.mobile,
      email: userData.email,
      subject: "",
      query: "",
    },
  });

  const onSubmit = async (data: ContactFormT) => {
    setLoading(true);
    const payload: IContactForm = {
      ...data,
      timestamp: Date.now(),
      uuid: helpers.generateUniqueId(),
    };

    try {
      const response = await axios.post<{ message: string }>(
        "/api/contact",
        payload
      );

      if (response.data.message) {
        helpers.toastify(
          "We have recieved your query, We'll get back to you within 24 hours!",
          "success"
        );
      }

      resetField("query");
      resetField("subject");
      setLoading(false);
    } catch (error: any) {
      helpers.toastify(
        error.response.data.message || "Something went wrong!",
        "error"
      );
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 mb-8"
        noValidate
      >
        {!userData.name && (
          <>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  isRequired
                  size="sm"
                  label="Name"
                  {...field}
                  isInvalid={!!errors.name?.message?.toString()}
                  errorMessage={errors.name?.message?.toString()}
                />
              )}
            />
            <Controller
              name="mobile"
              control={control}
              render={({ field }) => (
                <Input
                  isRequired
                  size="sm"
                  {...field}
                  label="Mobile"
                  isInvalid={!!errors.mobile?.message?.toString()}
                  errorMessage={errors.mobile?.message?.toString()}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  isRequired
                  size="sm"
                  label="Email"
                  {...field}
                  isInvalid={!!errors.email?.message?.toString()}
                  errorMessage={errors.email?.message?.toString()}
                />
              )}
            />
          </>
        )}
        <Controller
          name="subject"
          control={control}
          render={({ field }) => (
            <Input
              isRequired
              size="sm"
              label="Subject"
              {...field}
              isInvalid={!!errors.subject?.message?.toString()}
              errorMessage={errors.subject?.message?.toString()}
            />
          )}
        />
        <Controller
          name="query"
          control={control}
          render={({ field }) => (
            <Textarea
              isRequired
              size="sm"
              label="Query"
              {...field}
              isInvalid={!!errors.query?.message?.toString()}
              errorMessage={errors.query?.message?.toString()}
              className="col-span-2"
            />
          )}
        />
        <Button
          color="secondary"
          type="submit"
          className="w-full font-semibold uppercase"
          isLoading={loading}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default ContactForm;
