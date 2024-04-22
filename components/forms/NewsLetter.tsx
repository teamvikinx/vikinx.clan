"use client";
import { helpers } from "@/lib/utils";
import { newsletterValidation } from "@/lib/validations/newsletter.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type NewsletterFormT = z.infer<typeof newsletterValidation>;

const NewsLetter = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
  } = useForm<NewsletterFormT>({
    resolver: zodResolver(newsletterValidation),
  });

  const onSubscribe = () => {
    const { email } = getValues();
    if (!email || !helpers.validateEmail(email)) {
      return helpers.toastify("Please enter a valid email!", "error");
    }

    onOpen();
  };

  const onSubmit = async (data: NewsletterFormT) => {
    setLoading(true);
    const payload: INewsletterForm = {
      ...data,
      joined_at: Date.now().toString(),
      subscribed: true,
    };

    try {
      const response = await axios.post<{ message: string }>(
        "/api/newsletter",
        payload
      );

      if (response.data.message) {
        helpers.toastify(
          "Successfully subscribed to our newsletter",
          "success"
        );
      }

      reset();
      setLoading(false);
    } catch (error: any) {
      const _error = error as AxiosError;

      _error.response?.status === 409
        ? helpers.toastify("You have already registered to our newsletter.", 'success')
        : helpers.toastify("Something went wrong!", "error");
      setLoading(false);
    }
  };

  return (
    <>
      <form className="space-y-6 mb-8" noValidate>
        <div className="grid lg:grid-cols-2 items-center mt-8">
          <h1 className="text-lg md:text-3xl text-center mb-2 lg:text-left lg:mb-0">
            Join Our Newsletter to Stay in Loop
          </h1>
          <div>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  size="sm"
                  label="Email"
                  {...field}
                  isInvalid={!!errors.email?.message?.toString()}
                  errorMessage={errors.email?.message?.toString()}
                  endContent={
                    <Button size="sm" onClick={onSubscribe}>
                      Subscribe
                    </Button>
                  }
                />
              )}
            />
          </div>
        </div>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Just there!
                </ModalHeader>
                <ModalBody>
                  <p>We request just few more details before joining.</p>
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
                        size="sm"
                        {...field}
                        label="Mobile"
                        isInvalid={!!errors.mobile?.message?.toString()}
                        errorMessage={errors.mobile?.message?.toString()}
                      />
                    )}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="secondary"
                    variant="light"
                    onClick={handleSubmit(onSubmit)}
                    isLoading={loading}
                  >
                    Subscribe
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </form>
    </>
  );
};

export default NewsLetter;
