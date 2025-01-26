import { useMutation } from "@tanstack/react-query";
import cc from "classnames";
import { api } from "core/api";
import ErrorBox from "core/components/ErrorBox/ErrorBox";
import FormattedTextInput from "core/components/fields/FormattedTextInput";
import TextArea from "core/components/fields/TextArea";
import Input from "core/components/fields/TextInput";
import { showToastError } from "core/utils/errors";
import React, { FC, ReactNode } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Inputs = {
  avatar?: string;
  pronoun: string;
  firstname: string;
  lastname: string;
  preferredName?: string;
  phone: string;
  wwc?: string;
  dob: string;
  manualPronoun?: string;
  allergies?: string;
  emergencyPhone: string;
  emergencyName: string;
  emergencyRelationship: string;
};

const PRONOUNS = {
  SHE: "She/Her",
  HE: "He/Him",
  THEY: "They/Them",
  OTHER: "Other",
  NULL: "Rather not say",
};

const mapInitialData = (data?: Inputs) => {
  if (!data) {
    return undefined;
  }
  const mappedIntialData = {
    ...data,
  };
  if (!Object.values(PRONOUNS).includes(data.pronoun)) {
    mappedIntialData.manualPronoun = data.pronoun;
    mappedIntialData.pronoun = "Other";
  }
  return mappedIntialData;
};

const NewPersonForm: FC<{
  onSuccess?: () => void;
  initialData?: Inputs;
}> = ({ onSuccess, initialData }) => {
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
    watch,
  } = useForm<Inputs>({
    values: mapInitialData(initialData),
  });

  const pronoun = watch("pronoun");
  const firstName = watch("firstname");
  const lastName = watch("lastname");
  const preferredName = watch("preferredName");

  const mutation = useMutation<unknown, Error, Inputs>({
    mutationFn: (formData) => {
      let finalPronoun = formData.pronoun;
      if (finalPronoun === "Other" && formData.manualPronoun) {
        finalPronoun = formData.manualPronoun;
      }
      return api.personnel.mePost({
        personalDetails: {
          pronoun: finalPronoun,
          firstName: formData.firstname,
          lastName: formData.lastname,
          preferredName: formData.preferredName,
          phone: formData.phone,
          wwc: formData.wwc,
          dob: formData.dob,
          allergies: formData.allergies || "",
          emergencyName: formData.emergencyName,
          emergencyRelationship: formData.emergencyRelationship,
          emergencyPhone: formData.emergencyPhone,
        },
      });
    },
    onError: (e) => {
      showToastError("Something went wrong updating personal details.", e);
    },
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
      toast.success("Personal data successfully updated.");
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    mutation.mutate(formData);
  };

  return (
    <form data-testid="NewPersonForm" onSubmit={handleSubmit(onSubmit)}>
      <p className="mb-2 text-lg font-bold">Personal details</p>
      <Row>
        <label
          className={cc({ ["md:w-24"]: pronoun === "Other" }, "form-control")}
        >
          <div className="label">
            <span className="label-text-alt">Pronoun</span>
          </div>
          <select className="select select-bordered" {...register("pronoun")}>
            <option>{PRONOUNS.SHE}</option>
            <option>{PRONOUNS.HE}</option>
            <option>{PRONOUNS.THEY}</option>
            <option>{PRONOUNS.OTHER}</option>
            <option value="null">{PRONOUNS.NULL}</option>
          </select>
        </label>

        {pronoun === "Other" && (
          <div className="md:mt-8 md:w-28 w-full">
            <Input
              register={register("manualPronoun", { required: false })}
              placeholder="Pronoun"
              errors={errors}
            />
          </div>
        )}

        <Input
          register={register("firstname", { required: true })}
          placeholder="First name"
          errors={errors}
          label="First name (as you want it credited in programs)"
          showRequired
        />
        <Input
          label="Last name"
          register={register("lastname", { required: true })}
          placeholder="Last name"
          errors={errors}
          showRequired
        />
      </Row>
      <Row>
        <Input
          register={register("preferredName")}
          placeholder="Preferred name"
          errors={errors}
          label={`Preferred name is optional and if entered will replace your first name in the ShowPlanner. (e.g. Matilda likes to be credited as "Matilda" in programs, but prefers to go by "Till" in person.`}
        />
        {firstName && lastName && preferredName && preferredName != "" && (
          <ErrorBox info>
            <div>
              <p>
                Your name in programs will appear as{" "}
                <span className="font-bold">
                  {firstName} {lastName}
                </span>
              </p>
              <p>
                Your name in the ShowPlanner roster etc. will appear as{" "}
                <span className="font-bold">
                  {preferredName} {lastName}
                </span>
              </p>
            </div>
          </ErrorBox>
        )}
      </Row>
      <Row>
        <FormattedTextInput
          label={
            <>
              You can apply for a WWC{" "}
              <a
                href="https://www.service.nsw.gov.au/transaction/apply-for-a-working-with-children-check"
                className="link"
              >
                at this website.
              </a>
              <br /> Only required if you&apos;re over 18 and doing a show with
              minors.{" "}
            </>
          }
          register={register("wwc")}
          placeholder="Working with Children Check number"
          errors={errors}
          mask="*** ********"
        />
        <FormattedTextInput
          label="Phone number"
          register={register("phone", { required: true })}
          placeholder="Phone"
          errors={errors}
          mask="0499 999 999"
          className="md:mt-8"
          showRequired
        />
        <Input
          label="Date of birth"
          type="date"
          register={register("dob", { required: true })}
          placeholder="Date of birth (DD/MM/YYYY)"
          errors={errors}
          className="justify-end"
          showRequired
        />
      </Row>
      <Row>
        <TextArea
          register={register("allergies", { required: true })}
          placeholder="Allergies and/or medical conditions"
          errors={errors}
          showRequired
          className="h-20"
        />
      </Row>
      <p className="mb-2 mt-4 text-lg font-bold">Emergency Contact Details</p>
      <Row>
        <Input
          register={register("emergencyName", { required: true })}
          placeholder="Name"
          label="Emergency contact name"
          errors={errors}
          showRequired
        />
        <FormattedTextInput
          register={register("emergencyPhone", { required: true })}
          placeholder="Phone"
          label="Emergency contact phone"
          errors={errors}
          mask="0499 999 999"
          showRequired
        />
        <Input
          label="Relationship to emergency contact"
          register={register("emergencyRelationship", { required: true })}
          placeholder="Relation (parent, sibling, partner etc.)"
          errors={errors}
          showRequired
        />
      </Row>

      <button
        type="submit"
        className={cc("btn btn-block", {
          ["btn-secondary sticky bottom-2"]:
            Object.keys(formState.dirtyFields).length > 0 && initialData,
        })}
      >
        {mutation.isLoading && (
          <span className="loading loading-spinner"></span>
        )}
        Save
      </button>
    </form>
  );
};

const Row: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={cc("flex flex-col gap-2 md:flex-row", className)}>
      {children}
    </div>
  );
};

export default NewPersonForm;
