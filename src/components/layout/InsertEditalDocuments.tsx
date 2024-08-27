import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { fileSchema, IFile } from "@/types/types";
import { mockInputsEmpresa } from "@/mocks";
export default function InsertEditalDocuments() {
  const form = useForm<IFile>({
    resolver: zodResolver(fileSchema),
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})}>
          {mockInputsEmpresa.map((item, index) => {
            const categoryKey = Object.keys(item)[0];
            const filesArray = item[categoryKey];
            return (
              <div key={index}>
                <h1>{categoryKey}</h1>
                {filesArray.map((file, index) => {
                  return (
                    <FormField
                      key={index}
                      control={form.control}
                      name={file.name as "name"}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{file.label}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={String(field.value)}
                              className="transition-all"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
                })}
              </div>
            );
          })}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} className="transition-all" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
}
