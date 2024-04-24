import { states } from "@/lib/data/states";
import { constants, helpers } from "@/lib/utils";
import { quickEnrollFormValidation } from "@/lib/validations/quickEnrollValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Divider,
  Input,
  Link,
  Select,
  SelectItem,
} from "@nextui-org/react";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type QuickEnrollFormT = z.infer<typeof quickEnrollFormValidation>;

interface QuickEnrollFormInterface {
  user: Partial<IUser>;
  onClose: () => void;
}

const QuickEnrollForm: React.FC<QuickEnrollFormInterface> = ({
  user,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<QuickEnrollFormT>({
    resolver: zodResolver(quickEnrollFormValidation),
  });

  const onSubmit = async (values: QuickEnrollFormT) => {
    setLoading(true);
    try {
      const response = await axios.post<{ message: string }>("/api/users", {
        ...values,
        user_id: user.user_id,
      });

      if (
        response.data.message &&
        constants.allowedStates.includes(values.state.toLowerCase())
      ) {
        const response = await axios.post<{ message: string }>("/api/rides", {
          joined_at: Date.now(),
          user_id: user.user_id,
          name: user.name,
          profile_picture: user.profile_picture,
          ride_id: params.id,
        });

        if (response.data.message) {
          helpers.toastify("Sucessfully enrolled! 🎉🎉🎉", "success");
        }
      } else {
        helpers.toastify("Sorry we do not serve in you state yet!", "error");
      }
      router.push("/events");
      onClose();
      setLoading(false);
    } catch (error: any) {
      helpers.toastify(error.message || "Something went wrong!", "error");
      setLoading(false);
    }
  };

  return (
    <>
      {/* quick enroll modal */}

      <p>We request just few more details before enrolling.</p>
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
        name="emergency_number"
        control={control}
        render={({ field }) => (
          <Input
            isRequired
            size="sm"
            label="Emergency Number"
            {...field}
            isInvalid={!!errors.emergency_number?.message?.toString()}
            errorMessage={errors.emergency_number?.message?.toString()}
          />
        )}
      />
      <Controller
        name="dob"
        control={control}
        render={({ field }) => (
          <Input
            isRequired
            size="sm"
            label="Date of birth"
            type="date"
            {...field}
            isInvalid={!!errors.dob?.message?.toString()}
            errorMessage={errors.dob?.message?.toString()}
          />
        )}
      />
      <Controller
        name="state"
        control={control}
        render={({ field }) => {
          return (
            <Select
              isRequired
              size="sm"
              label="State"
              {...field}
              isInvalid={!!errors.state}
              errorMessage={errors.state?.message?.toString()}
              defaultSelectedKeys={[field.value]}
            >
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </Select>
          );
        }}
      />

      <div className="my-4">
        <small>
          To streamline the process and ensure efficiency for future
          interactions, it is recommended to{" "}
          <span
            onClick={() =>
              router.push(`/onboarding?enroll=true&eventId=${params.id}`)
            }
            className="text-primary underline cursor-pointer font-bold"
          >
            complete your profile now
          </span>
          .
        </small>
        <div className="flex items-center justify-center my-4">
          <div className="border w-14" />
          <p className="mx-4">Or</p>
          <div className="border w-14" />
        </div>
        <Button
          color="secondary"
          variant="flat"
          onClick={handleSubmit(onSubmit)}
          isLoading={loading}
          className="w-full mt-2"
        >
          Submit
        </Button>
      </div>

      {/* quick enroll modal */}
    </>
  );
};

export default QuickEnrollForm;
