import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DocSchema } from "@/types/types";
import { mockInputsEmpresa } from "@/mocks";

export default function InsertEditalDocuments() {
  const form = useForm({
    resolver: zodResolver(DocSchema),
  });

  const onSubmit = (data: any) => console.log(data);
  console.log(form.formState.errors);

  return (
    <div className="grid place-content-center mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {mockInputsEmpresa.map((item, index) => {
            const categoryKey = Object.keys(item)[0];
            const filesArray = item[categoryKey];

            return (
              <div key={index}>
                <h2 className="text-lg text-center font-bold mb-4">
                  {categoryKey}
                </h2>
                {filesArray.map((field, fieldIndex) =>
                  Object.entries(field).map(([fieldName, label]) => (
                    <FormField
                      key={`${fieldName}-${fieldIndex}`}
                      control={form.control}
                      name={`mockInputFiles[${index}][${categoryKey}][${fieldIndex}][${fieldName}].file`}
                      render={({ field }) => (
                        <FormItem className="m-2">
                          <FormLabel>{label}</FormLabel>
                          <FormControl>
                            <Input type="file" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))
                )}
              </div>
            );
          })}
          <Button className="bg-gradient-primary w-full" type="submit">
            Preparar Documentos
          </Button>
        </form>
      </Form>
    </div>
  );
}
