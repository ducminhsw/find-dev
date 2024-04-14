import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RefObject, useImperativeHandle } from "react";
import { FormFunction, FormModel, InforFunction } from "./DeveloperModels";
import { FaceImage } from "@/assets";

const language = z.object({
  name: z.string(),
  level: z.string(),
});

const experience = z.object({
  company: z
    .string()
    .min(5, {
      message: "This field must be at least 5 characters",
    })
    .max(100, {
      message: "This field must be below 100 characters",
    }),
  years: z
    .number()
    .min(5, {
      message: "This field must be at least 5 characters",
    })
    .max(100, {
      message: "This field must be below 100 characters",
    }),
  work: z
    .string()
    .min(5, {
      message: "This field must be at least 5 characters",
    })
    .max(100, {
      message: "This field must be below 100 characters",
    }),
});

const project = z.object({
  name: z
    .string()
    .min(5, {
      message: "This field must be at least 5 characters",
    })
    .max(100, {
      message: "This field must be below 100 characters",
    }),
  techstack: z
    .string()
    .min(5, {
      message: "This field must be at least 5 characters",
    })
    .max(100, {
      message: "This field must be below 100 characters",
    }),
  duration: z
    .string()
    .min(5, {
      message: "This field must be at least 5 characters",
    })
    .max(100, {
      message: "This field must be below 100 characters",
    }),
  purpose: z
    .string()
    .min(5, {
      message: "This field must be at least 5 characters",
    })
    .max(100, {
      message: "This field must be below 100 characters",
    }),
});

export const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .max(25, {
      message: "Email must not be at above 25 characters",
    }),
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(15, {
      message: "Username must not be at above 15 characters",
    }),
  firstname: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters",
    })
    .max(15, {
      message: "First name must not be at above 15 characters",
    }),
  lastname: z
    .string()
    .min(2, {
      message: "Last name must be at least 2 characters",
    })
    .max(15, {
      message: "Last name must not be at above 15 characters",
    }),
  avatarlink: z.string(),
  objective: z.string().max(400, {
    message: "Objective must be less then 400 characters",
  }),
  mainSkill: language,
  otherSkills: z.array(language),
  experience: z.array(experience),
  projects: z.array(project),
});

interface Props {
  formRef: RefObject<FormFunction>;
  infoRef: RefObject<InforFunction>;
}

export default function DeveloperFormContent({ formRef, infoRef }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    defaultValues: {
      email: "ducminhsw721@gmail.com",
      username: "ducminhsw",
      firstname: "Minh",
      lastname: "Nguyen",
      avatarlink: FaceImage,
      objective: "",
      mainSkill: {},
      otherSkills: [],
      experience: [],
      projects: [],
    },
  });

  const onSubmitForm = (type: number) => {
    return function (values: z.infer<typeof formSchema>) {
      if (type === 0 || type === 1) console.log(values);
    };
  };

  const onSetPreview = () => {
    infoRef.current?.handleSetPreview();
  };

  const onCancelForm = () => {
    form.reset();
  };

  useImperativeHandle(formRef, () => ({
    getFormValues() {
      return form.getValues() as FormModel;
    },
  }));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitForm(1))}
        onReset={onCancelForm}
        className="w-full space-y-6 mt-3"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled placeholder="Enter username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-5">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Firstname</FormLabel>
                <FormControl>
                  <Input placeholder="Enter firstname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Lastname</FormLabel>
                <FormControl>
                  <Input placeholder="Enter lastname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="avatarlink"
          render={({ field }) => (
            <FormItem className="w-2/5">
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <Input placeholder="Enter lastname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="objective"
          render={({ field }) => (
            <FormItem className="w-2/5">
              <FormLabel>Objective</FormLabel>
              <FormControl>
                <Input placeholder="Enter lastname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mainSkill.name"
          render={({ field }) => (
            <FormItem className="w-2/5">
              <FormLabel>Objective</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your main skill language"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mainSkill.level"
          render={({ field }) => (
            <FormItem className="w-2/5">
              <FormLabel>Objective</FormLabel>
              <FormControl>
                <Input placeholder="Enter your main skill level" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.getValues("otherSkills").map((_, index) => {
          return (
            <div className="flex">
              <FormField
                control={form.control}
                name={`otherSkills.${index}.name`}
                render={({ field }) => (
                  <FormItem className="w-2/5">
                    <FormLabel>Objective</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your main skill level"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`otherSkills.${index}.level`}
                render={({ field }) => (
                  <FormItem className="w-2/5">
                    <FormLabel>Objective</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your main skill level"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          );
        })}
        {form.getValues("experience").map((_, index) => {
          return (
            <div>
              <FormField
                control={form.control}
                name={`experience.${index}.company`}
                render={({ field }) => (
                  <FormItem className="w-2/5">
                    <FormLabel>Objective</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your main skill level"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`experience.${index}.years`}
                render={({ field }) => (
                  <FormItem className="w-2/5">
                    <FormLabel>Objective</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your main skill level"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`experience.${index}.work`}
                render={({ field }) => (
                  <FormItem className="w-2/5">
                    <FormLabel>Objective</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your main skill level"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          );
        })}
        {form.getValues("projects").map((_, index) => {
          return (
            <div>
              <FormField
                control={form.control}
                name={`projects.${index}.name`}
                render={({ field }) => (
                  <FormItem className="w-2/5">
                    <FormLabel>Objective</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your main skill level"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`projects.${index}.techstack`}
                render={({ field }) => (
                  <FormItem className="w-2/5">
                    <FormLabel>Objective</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your main skill level"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`projects.${index}.duration`}
                render={({ field }) => (
                  <FormItem className="w-2/5">
                    <FormLabel>Objective</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your main skill level"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`projects.${index}.purpose`}
                render={({ field }) => (
                  <FormItem className="w-2/5">
                    <FormLabel>Objective</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your main skill level"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          );
        })}
        <Button
          type="reset"
          className="mr-[20px] bg-white border text-slate-900 hover:bg-slate-100"
        >
          Reset
        </Button>
        <Button
          type="button"
          onClick={onSetPreview}
          className="bg-blue-400 text-white mr-[20px] border hover:bg-slate-100"
        >
          Preview
        </Button>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
