import cc from "classnames";
import FormattedTextInput from "core/components/fields/FormattedTextInput";
import TextArea from "core/components/fields/TextArea";
import Input from "core/components/fields/TextInput";
import { useRouter } from "next/router";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Inputs = {
  avatar: string;
  profilepicture: any;
  pronoun: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  wwc: string;
  dob: string;
  allergies: string;
  emergencyPhone: string;
  emergencyName: string;
  emergencyRelationship: string;
  hearAboutUs: string;
  previousWork: string;
  reasonForCrewing: string;
  user: string;
  publishedAt: Date;
};

const NewPersonForm: FC<{}> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {}, []);

  const onSubmit: SubmitHandler<Inputs> = async () => {
    setLoading(true);

    try {
      // TODO: Create person
      //
      // await client.request(createPerson, { data });
      toast.success("Details successfully updated, redirecting to shows list.");
      reloadSession();
      router.push("/shows");
    } catch (e) {
      toast.error("Something went wrong creating person");
      console.error("Could not create person", e);
      setLoading(false);
    }
  };

  return (
    <form data-testid="NewPersonForm" onSubmit={handleSubmit(onSubmit)}>
      <p className="mb-2 text-lg font-bold">Personal details</p>
      <Row>
        <select className="select select-bordered" {...register("pronoun")}>
          <option disabled selected>
            Pronoun
          </option>
          <option>She/Her</option>
          <option>He/Him</option>
          <option>They/Them</option>
          <option>Other</option>
        </select>

        <Input
          register={register("firstname", { required: true })}
          placeholder="First name"
          errors={errors}
          showRequired
        />
        <Input
          register={register("lastname", { required: true })}
          placeholder="Last name"
          errors={errors}
          showRequired
        />
      </Row>
      <Row>
        <Input
          register={register("email", {
            required: true,
            pattern: {
              value:
                /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/,
              message: "Must be an email",
            },
          })}
          placeholder="Email"
          errors={errors}
          showRequired
        />
        <FormattedTextInput
          register={register("phone", { required: true })}
          placeholder="Phone"
          errors={errors}
          mask="0499 999 999"
          showRequired
        />
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
          errors={errors}
          showRequired
        />
        <FormattedTextInput
          register={register("emergencyPhone", { required: true })}
          placeholder="Phone"
          errors={errors}
          mask="0499 999 999"
          showRequired
        />
        <Input
          register={register("emergencyRelationship", { required: true })}
          placeholder="Relation (parent, sibling, partner etc.)"
          errors={errors}
          showRequired
        />
      </Row>

      <p className="mb-2 text-lg font-bold">Other</p>
      <TextArea
        register={register("hearAboutUs")}
        placeholder="How did you hear about us?"
        errors={errors}
        className="h-20 mb-4"
      />
      <TextArea
        register={register("previousWork")}
        placeholder="Previous work or experience"
        errors={errors}
        className="h-20 mb-4"
      />
      <TextArea
        register={register("reasonForCrewing")}
        placeholder="What are your reasons for doing community crewing? Are there any goals you hope to accomplish (meeting new people, getting professional work etc.)"
        errors={errors}
        className="h-20 mb-4"
      />
      <button type="submit" className={cc({ loading }, "btn btn-block")}>
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

const reloadSession = () => {
  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
};

export default NewPersonForm;
