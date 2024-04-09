"use client";

import { helpers } from "@/lib/utils";
import { contactValidation } from "@/lib/validations/contact.validation";
import { reviewValidation } from "@/lib/validations/review.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea, Button } from "@nextui-org/react";
import axios from "axios";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

type ReviewFormT = z.infer<typeof reviewValidation>;

interface ReviewFormProps {
  currentUser: { name: string; id: string };
}

const ReviewForm: React.FC<ReviewFormProps> = ({ currentUser }) => {
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState("");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ReviewFormT>({
    resolver: zodResolver(reviewValidation),
  });

  const onSubmit = async (data: ReviewFormT) => {
    setLoading(true);
    const payload: IReview = {
      ...data,
      is_approved: false,
      is_featured: false,
      review_by: {
        name: currentUser.name,
        id: currentUser.id,
      },
      reviewed_at: Date.now(),
      uuid: helpers.generateUniqueId(),
    };

    try {
      const response = await axios.post<{ message: string }>(
        "/api/review",
        payload
      );

      if (response.data.message) {
        setCharCount("");
        helpers.toastify(
          response.data.message,
          response.status === 201 ? "success" : "error"
        );
      }
      setLoading(false);
    } catch (error: any) {
      helpers.toastify(
        error.response.data.message || "Something went wrong!",
        "error"
      );
      setLoading(false);
    }
  };

  const onValueChange = (value: string) => setCharCount(value);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-8">
        <Controller
          name="comment"
          control={control}
          render={({ field }) => (
            <Textarea
              isRequired
              size="sm"
              label="Your Story"
              {...field}
              isInvalid={!!errors.comment?.message?.toString()}
              errorMessage={errors.comment?.message?.toString()}
              className="col-span-2"
              onValueChange={onValueChange}
              value={charCount}
            />
          )}
        />
        <small className="text-gray-500 block text-end !mt-1">
          {charCount.length} / 1000
        </small>
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

export default ReviewForm;
