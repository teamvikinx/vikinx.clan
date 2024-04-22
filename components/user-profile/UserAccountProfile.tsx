"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Textarea,
  Link,
  Chip,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { userValidation } from "@/lib/validations/user.validation";
import { z } from "zod";
import { Facebook, Instagram, Twitter } from "lucide-react";
import axios from "axios";
import { constants, helpers } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";
import { states } from "@/lib/data/states";
import { cities } from "@/lib/data/cities";

type OnboadringForm = z.infer<typeof userValidation>;

interface UserAccountProfileProps {
  userData: IUser;
  edit?: boolean;
}

const UserAccountProfile: React.FC<UserAccountProfileProps> = ({
  userData,
  edit = false,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCities, setSelectedCities] = useState<typeof cities>([]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<OnboadringForm>({
    resolver: zodResolver(userValidation),
    defaultValues: {
      name: userData.name,
      aka: userData.aka,
      bio: userData.bio,
      mobile: userData.mobile,
      emergency_number: userData.emergency_number,
      email: userData.email,
      bikes:
        userData.bikes && userData.bikes.length
          ? userData.bikes
          : [{ name: "", pet_name: "" }],
      dob: userData.dob?.toString(),
      instagram: !!userData.socials["instagram"]
        ? userData.socials["instagram"]
        : undefined,
      facebook: !!userData.socials["facebook"]
        ? userData.socials["facebook"]
        : undefined,
      twitter: !!userData.socials["twitter"]
        ? userData.socials["twitter"]
        : undefined,
      blood_group: userData.blood_group,
      state: userData.state,
      pincode: userData.pincode,
      gender: userData.gender,
      address: userData.address,
      city: userData.city,
    },
  });

  const {
    fields: bikeFields,
    append: appendBike,
    remove: removeBike,
  } = useFieldArray({
    control,
    name: "bikes",
  });

  const onStateChange = (state: any): any => {
    const _cities = cities.filter(
      (city) =>
        city.state?.toLowerCase() === state.values().next().value?.toLowerCase()
    );
    setSelectedCities(_cities);
  };

  const onSubmit = async (data: OnboadringForm) => {
    setLoading(true);
    const payload: Partial<IUser> = {
      ...data,
      bio:
        data.bio ||
        `Hello everyone! My name is ${data.name} ${
          data.aka ? `but you can call me ${data.aka}` : ""
        }, I hail from the vibrant city of ${
          data.city
        } nestled in the heart of ${data.state}. I’m the proud owner of ${
          data.bikes[0].name
        } affectionately dubbed ${
          data.bikes[0].pet_name
        }. It’s a thrill to be part of VikinX, and I’m eagerly anticipating all the exciting events on the horizon. Let’s ride into new adventures together!`,
      bikes: data.bikes.length ? data.bikes : [],
      socials: {
        instagram: data.instagram || "",
        facebook: data.facebook || "",
        twitter: data.twitter || "",
      },
      user_id: userData.user_id,
      onboarding: true,
    };

    try {
      const response = await axios.post<{ message: string }>(
        "/api/users",
        payload
      );

      if (response.data.message) {
        if (Boolean(params.get("enroll")) && params.get("eventId")) {
          const response = await axios.post<{ message: string }>("/api/rides", {
            joined_at: Date.now(),
            user_id: userData.user_id,
            name: data.name,
            profile_picture: userData.profile_picture,
            ride_id: params.get("eventId"),
          });

          if (response.data.message) {
            router.push(`/events${params.get("eventId")}`);
            setLoading(false);
            return
          }
        }

        if (edit) {
          setEditMode(false);
          router.push("/profile");
          helpers.toastify("Updated profile successfully 🎉", "success");
        } else {
          router.push("/");
        }
      }
      setLoading(false);
    } catch (error: any) {
      helpers.toastify(error.message || "Something went wrong!", "error");
      setLoading(false);
    }
  };

  console.log(params.get("eventId"));

  useEffect(() => {
    const _cities = cities.filter(
      (city) => city.state?.toLowerCase() === userData.state?.toLowerCase()
    );
    setSelectedCities(_cities);
  }, []);

  return (
    <>
      {edit && (
        <div className="flex justify-between items-center mb-4">
          <Chip variant="faded" className="text-xs font-semibold">
            Mode: {editMode ? "Edit" : "View"}
          </Chip>

          <Button
            size="sm"
            color="secondary"
            variant="flat"
            onClick={() => setEditMode((prevState) => !prevState)}
          >
            {editMode ? "View Details" : "Edit Details"}
          </Button>
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 mb-8"
        noValidate
      >
        <Card>
          <CardHeader>Basic Details</CardHeader>
          <Divider />
          <CardBody>
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    isRequired
                    readOnly={edit && !editMode}
                    size="sm"
                    label="Name"
                    {...field}
                    isInvalid={!!errors.name?.message?.toString()}
                    errorMessage={errors.name?.message?.toString()}
                  />
                )}
              />

              <Controller
                name="aka"
                control={control}
                render={({ field }) => (
                  <Input
                    readOnly={edit && !editMode}
                    size="sm"
                    label="AKA"
                    {...field}
                    isInvalid={!!errors.aka?.message?.toString()}
                    errorMessage={errors.aka?.message?.toString()}
                  />
                )}
              />
              <Controller
                name="bio"
                control={control}
                render={({ field }) => (
                  <Textarea
                    readOnly={edit && !editMode}
                    size="sm"
                    label="Bio"
                    {...field}
                    isInvalid={!!errors.bio?.message?.toString()}
                    errorMessage={errors.bio?.message?.toString()}
                    className="col-span-2"
                  />
                )}
              />
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <Textarea
                    isRequired
                    readOnly={edit && !editMode}
                    size="sm"
                    label="Address"
                    {...field}
                    isInvalid={!!errors.address?.message?.toString()}
                    errorMessage={errors.address?.message?.toString()}
                    className="col-span-2"
                  />
                )}
              />
              <Controller
                name="mobile"
                control={control}
                render={({ field }) => (
                  <Input
                    isRequired
                    readOnly={edit && !editMode}
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
                    readOnly={edit && !editMode}
                    size="sm"
                    label="Emergency Number"
                    {...field}
                    isInvalid={!!errors.emergency_number?.message?.toString()}
                    errorMessage={errors.emergency_number?.message?.toString()}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    isRequired
                    readOnly={edit && !editMode}
                    size="sm"
                    label="Email"
                    {...field}
                    isInvalid={!!errors.email?.message?.toString()}
                    errorMessage={errors.email?.message?.toString()}
                  />
                )}
              />
              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <Input
                    isRequired
                    readOnly={edit && !editMode}
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
                name="blood_group"
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      isRequired
                      size="sm"
                      isDisabled={edit && !editMode}
                      label="Blood Group"
                      {...field}
                      isInvalid={!!errors.blood_group}
                      errorMessage={errors.blood_group?.message?.toString()}
                      defaultSelectedKeys={[field.value]}
                    >
                      {constants.bloodGroups.map((blood_group) => (
                        <SelectItem key={blood_group} value={blood_group}>
                          {blood_group}
                        </SelectItem>
                      ))}
                    </Select>
                  );
                }}
              />
              <Controller
                name="gender"
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      isRequired
                      size="sm"
                      isDisabled={edit && !editMode}
                      label="Gender"
                      {...field}
                      isInvalid={!!errors.gender}
                      errorMessage={errors.gender?.message?.toString()}
                      defaultSelectedKeys={[field.value]}
                    >
                      {constants.genders.map((gender) => (
                        <SelectItem
                          key={gender}
                          value={gender}
                          className="capitalize"
                        >
                          {gender}
                        </SelectItem>
                      ))}
                    </Select>
                  );
                }}
              />
              <Controller
                name="state"
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      isRequired
                      isDisabled={edit && !editMode}
                      size="sm"
                      label="State"
                      {...field}
                      isInvalid={!!errors.state}
                      errorMessage={errors.state?.message?.toString()}
                      defaultSelectedKeys={[field.value]}
                      onSelectionChange={onStateChange}
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
              <Controller
                name="city"
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      isRequired
                      isDisabled={edit && !editMode}
                      size="sm"
                      label="City"
                      {...field}
                      isInvalid={!!errors.city}
                      errorMessage={errors.city?.message?.toString()}
                      defaultSelectedKeys={[field.value]}
                    >
                      {selectedCities.map((city) => (
                        <SelectItem key={city.name} value={city.name}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </Select>
                  );
                }}
              />
              <Controller
                name="pincode"
                control={control}
                render={({ field }) => (
                  <Input
                    isRequired
                    readOnly={edit && !editMode}
                    size="sm"
                    label="Pincode"
                    {...field}
                    isInvalid={!!errors.pincode?.message?.toString()}
                    errorMessage={errors.pincode?.message?.toString()}
                  />
                )}
              />
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Socials</CardHeader>
          <Divider />
          <CardBody>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <Controller
                name="instagram"
                control={control}
                render={({ field }) => (
                  <Input
                    readOnly={edit && !editMode}
                    size="sm"
                    label="Instagram"
                    {...field}
                    isInvalid={!!errors.instagram?.message?.toString()}
                    errorMessage={errors.instagram?.message?.toString()}
                    endContent={<Instagram />}
                  />
                )}
              />
              <Controller
                name="facebook"
                control={control}
                render={({ field }) => (
                  <Input
                    readOnly={edit && !editMode}
                    size="sm"
                    label="Facebook"
                    {...field}
                    isInvalid={!!errors.facebook?.message?.toString()}
                    errorMessage={errors.facebook?.message?.toString()}
                    endContent={<Facebook />}
                  />
                )}
              />
              <Controller
                name="twitter"
                control={control}
                render={({ field }) => (
                  <Input
                    readOnly={edit && !editMode}
                    size="sm"
                    label="twitter"
                    {...field}
                    isInvalid={!!errors.twitter?.message?.toString()}
                    errorMessage={errors.twitter?.message?.toString()}
                    endContent={<Twitter />}
                  />
                )}
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>Add Bikes</CardHeader>
          <Divider />
          <CardBody>
            {bikeFields.map((field, index) => (
              <div
                key={field.id}
                className={`grid grid-cols-2 lg:grid-cols-${
                  (index && editMode) || (index && !params.get("edit")) ? 3 : 2
                }  gap-4 mb-6`}
              >
                <Controller
                  name={`bikes.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      isRequired
                      label="Bike Model"
                      readOnly={edit && !editMode}
                      {...field}
                      errorMessage={errors.bikes?.[index]?.name?.message}
                      isInvalid={!!errors.bikes?.[index]?.name?.message}
                      placeholder="Bike Name"
                      size="sm"
                    />
                  )}
                />
                <Controller
                  name={`bikes.${index}.pet_name`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Bike Petname"
                      readOnly={edit && !editMode}
                      {...field}
                      errorMessage={errors.bikes?.[index]?.pet_name?.message}
                      isInvalid={!!errors.bikes?.[index]?.pet_name?.message}
                      placeholder="Pet Name"
                      size="sm"
                    />
                  )}
                />
                {(index && editMode) || (index && !params.get("edit")) ? (
                  <Button
                    className="col-span-2 lg:col-auto"
                    color="danger"
                    variant="flat"
                    onClick={() => removeBike(index)}
                  >
                    Remove Bike
                  </Button>
                ) : (
                  ""
                )}
              </div>
            ))}
            {editMode || !userData.onboarding ? (
              <Button
                className="w-full mt-6"
                onClick={() => appendBike({ name: "", pet_name: "" })}
              >
                Add More Bikes
              </Button>
            ) : (
              <></>
            )}
          </CardBody>
        </Card>

        {editMode || !userData.onboarding ? (
          <Button
            color="secondary"
            type="submit"
            className="w-full font-semibold uppercase"
            isLoading={loading}
          >
            {editMode ? "Update" : "Submit"}
          </Button>
        ) : (
          <></>
        )}

        {!userData.onboarding && (
          <small className="text-center block">
            By clicking Submit, you agree to our{" "}
            <Link size="sm" color="secondary" href={"/terms-and-conditions"}>
              Terms and Conditions
            </Link>{" "}
            and that you have read our{" "}
            <Link size="sm" color="secondary" href={"/privacy-policy"}>
              Privacy Policy
            </Link>
          </small>
        )}
      </form>
    </>
  );
};

export default UserAccountProfile;
