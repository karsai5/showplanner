import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getApi } from "core/api";
import { MediaDTO } from "core/api/generated";
import FileInput from "core/components/fields/FileInput";
import Input from "core/components/fields/TextInput";
import { useRefreshToken } from "pages/me/refresh";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Inputs = {
  name: string;
  company: string;
  slug: string;
  bannerimage: string;
  publishedAt: Date;
  file: MediaDTO;
  crews: Array<string>;
};

interface NewShowFormProps {
  onSuccess?: () => void;
}

const NewShowForm: FC<NewShowFormProps> = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const api = getApi();
  const refresh = useRefreshToken();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Inputs>();

  const mutation = useMutation<unknown, unknown, Inputs>({
    mutationFn: (show) =>
      api.showsPost({
        show: {
          ...show,
          imageId: show.file?.id,
        },
      }),
    onError: (e) => {
      toast.error("Something went wrong creating new show");
      console.error("Could not create show", e);
    },
    onSuccess: async () => {
      toast.success("Succesfully created a new show");
      queryClient.invalidateQueries({ queryKey: ["AssignedShowsList"] });
      reset();
      if (onSuccess) {
        onSuccess();
      }
      refresh();
    },
  });

  return (
    <form
      data-testid="NewShowForm"
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
    >
      <FileInput
        label="Image for show"
        onChange={(media) => setValue("file", media)}
      />
      <Input
        register={register("name", { required: true })}
        placeholder="Name"
        errors={errors}
        showRequired
      />
      <Input
        register={register("company", { required: true })}
        placeholder="Company"
        errors={errors}
        showRequired
      />
      <Input
        register={register("slug", {
          required: true,
          pattern: {
            value: /^\w*$/,
            message: "Slug must be all lower case letters",
          },
          maxLength: {
            value: 20,
            message: "Must be less than 20 characters",
          },
        })}
        placeholder="URL Slug"
        errors={errors}
        showRequired
        helpText="The url slug is what people will see in the url when accessing the show. e.g. /shows/wicked"
      />
      <button type="submit" className="btn btn-block">
        {mutation.isLoading && (
          <span className="loading loading-spinner"></span>
        )}
        Create show
      </button>
    </form>
  );
};

export default NewShowForm;
