import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RefObject, useImperativeHandle } from "react";
import { FormFunction, FormModel, InforFunction } from "./DeveloperModels";
import { FaceImage } from "@/assets";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const language = z.object({
  name: z.string(),
  level: z.string(),
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

const experience = z.object({
  company: z
    .string()
    .min(5, {
      message: "This field must be at least 5 characters",
    })
    .max(100, {
      message: "This field must be below 100 characters",
    }),
  role: z
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
  work: project,
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
  languages: z.array(language),
  tools: z.array(z.string()),
  interests: z.array(z.string()),
  experience: z.array(experience),
  projects: z.array(project),
});

interface Props {
  defaultFormValues: FormModel;
  formRef: RefObject<FormFunction>;
  infoRef: RefObject<InforFunction>;
}

export default function DeveloperFormContent({
  defaultFormValues,
  formRef,
  infoRef,
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    defaultValues: defaultFormValues,
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
        className="w-[calc(100%-40px)] space-y-6 mt-3"
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
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your firstname" {...field} />
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
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your lastname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex space-x-5">
          <div className="flex-1 flex">
            <FormField
              control={form.control}
              name="avatarlink"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter lastname" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Avatar className="flex-1 h-[160px] w-full self-center rounded-3xl">
            <AvatarImage src={FaceImage} className="object-cover" />
          </Avatar>
        </div>
        <FormField
          control={form.control}
          name={`objective`}
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Objectives</FormLabel>
              <FormControl>
                <Textarea placeholder="Type your message here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.getValues("languages").map((_, index) => {
          return (
            <div className="flex space-x-5">
              <FormField
                control={form.control}
                name={`languages.${index}.name`}
                render={({ field }) => (
                  <FormItem className="w-2/5">
                    <FormLabel>Language</FormLabel>
                    <FormControl>
                      <Input placeholder="Type your message here." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`languages.${index}.level`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Your expertise in the language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Level</SelectLabel>
                          <SelectItem value="junior">Junior</SelectItem>
                          <SelectItem value="middle">Middle</SelectItem>
                          <SelectItem value="senior">Senior</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          );
        })}
        {form.getValues("experience").map((_, index) => {
          return (
            <div className="flex space-x-3">
              <FormField
                control={form.control}
                name={`experience.${index}.company`}
                render={({ field }) => (
                  <FormItem className="w-2/5">
                    <FormLabel>Company Name</FormLabel>
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
                    <FormLabel>Years</FormLabel>
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
                name={`experience.${index}.work.duration`}
                render={({ field }) => (
                  <FormItem className="w-2/5">
                    <FormLabel>Work duration</FormLabel>
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
                name={`experience.${index}.work.name`}
                render={({ field }) => (
                  <FormItem className="w-2/5">
                    <FormLabel>Project description</FormLabel>
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
                name={`experience.${index}.work.techstack`}
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
                name={`experience.${index}.work.purpose`}
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
