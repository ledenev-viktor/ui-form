import React, { useEffect, useState } from "react";
import { Steps } from "./steps";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import { Checkbox } from "../../ui/checkbox";
import { yupResolver } from "@hookform/resolvers/yup";
import { CheckboxGroup } from "../../ui/checkboxGroup/component";
import * as yup from "yup";
import { Dadata } from "../dadata";
import { RadioGroup, RadioSingle } from "../../ui/radio-group";
import { Attach } from "../../ui/attach";
import { Attach2 } from "../../ui/attach2/component";

const html = `
<div class="b-fields-head">
    <div class="fields-head__title">
        1.1 Название ПО*
    </div>
    <div class="fields-head__description">
        текущее название ПО без номеров версий продукта
    </div>
</div>
`;

const checkLabel =
  "силами сторонней организации (указать наименование, ОГРН, сведения о цепочке бенефициаров, приложить документ-основание, количество)";

export const FormSteps = (props) => {
  // const yupSchema = yup.object().shape({
  //   username: yup.string().required("Поле username обязательно"),
  //   username2: yup.string().required("Поле username2 обязательно"),
  //   username3: yup.string().required("Поле username3 обязательно"),
  //   username4: yup.string().required("Поле username4 обязательно"),
  //   username5: yup.string().required("Поле username5 обязательно"),
  //   username6: yup.string().required("Поле username6 обязательно"),
  //   pnh: yup
  //     .object()
  //     .shape({
  //       option0: yup.boolean(),
  //       option1: yup.boolean(),
  //       option2: yup.boolean(),
  //     })
  //     .test("pnh", "Выберите минимум один вариант", (options) => {
  //       return options.option0 || options.option1 || options.option2;
  //     }),
  // });
  const yupSchema = yup.object().shape({
    File: yup.mixed().test("File", "Это поле обязательно", (value = []) => {
      if (Array.from(value).length > 0) return true; // attachment is optional
    }),
    File2: yup.mixed().test("File2", "Это поле обязательно", (value = []) => {
      console.log(value.length);
      if (Array.from(value).length > 0) return true; // attachment is optional
      Array.from(value).forEach((item) => {
        console.log(item.size);
        if (item.size <= 2000) {
          return true;
        }
      });
    }),
  });

  // const yupSchema = yup.object().shape({});

  const form = useForm({
    defaultValues: {
      username: "",
    },
    mode: "all",
    resolver: yupResolver(yupSchema),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    setValue,
    reset,
    trigger,
  } = form;
  const onSubmit = (data) => console.log(data);

  console.log(errors);

  const address = register("address");
  const inn = register("inn");

  // const [files, setFiles] = React.useState([]);
  // const handleChangeFile = (event, payload) => {
  //   setFiles([...files, ...payload.files]);
  // };
  // useEffect(() => {
  //   console.log(files);
  // }, [files]);

  const steps = [
    {
      name: "step_1",
      nameFields: ["File"],
      fields: [
        <Attach2
          id="attach2"
          {...register("file")}
          setFormData={setValue}
          multiple={true}
          name="File"
          error={errors.File?.message}
        />,
        // <Attach
        //   id="attach"
        //   {...register("file")}
        //   value={files}
        //   onChange={handleChangeFile}
        //   multiple={true}
        //   name="file"
        //   onClear={() => setFiles([])}
        // />,
        <Controller
          control={control}
          name="radioGr"
          defaultValue={false}
          render={({ field: { value, onChange } }) => (
            <RadioGroup value={value} name="radioGroup" onChange={onChange}>
              <RadioSingle value="yes" label="Да" />
              <RadioSingle value="no" label="Нет" />
              <RadioSingle value="hz" label="Не знаю" />
            </RadioGroup>
          )}
        />,
        <Dadata
          block
          idAddress="address"
          idInn="inn"
          addressRef={address.ref}
          innRef={inn.ref}
          setFormValue={setValue}
        />,
        <Input
          label="Имя Настя"
          htmlTitle={html}
          type="text"
          id="username"
          block
          error={errors.username?.message}
          {...register("username", {
            required: {
              value: true,
              message: "Поле username обязательно",
            },
          })}
        />,
        <Input
          label="Фамилия"
          type="text"
          id="username2"
          block
          error={errors.username2?.message}
          {...register("username2", {
            required: {
              value: true,
              message: "Поле username2 обязательно",
            },
          })}
        />,
      ],
    },
    {
      name: "step_2",
      nameFields: ["File2"],
      fields: [
        <Attach2
          id="attach3"
          {...register("file2")}
          setFormData={setValue}
          multiple={true}
          name="File2"
          error={errors.File2?.message}
        />,
        // <Input
        //   label="Имя"
        //   htmlTitle={html}
        //   type="text"
        //   id="username3"
        //   block
        //   error={errors.username3?.message}
        //   {...register("username3", {
        //     required: {
        //       value: true,
        //       message: "Поле username3 обязательно",
        //     },
        //   })}
        // />,
        // <Input
        //   placeholder="Фамилия"
        //   htmlTitle={html}
        //   type="text"
        //   id="username4"
        //   block
        //   error={errors.username4?.message}
        //   {...register("username4", {
        //     required: {
        //       value: true,
        //       message: "Поле username4 обязательно",
        //     },
        //   })}
        // />,
        // <Controller
        //   control={control}
        //   name="check"
        //   defaultValue={false}
        //   render={({ field: { value, onChange } }) => (
        //     <Checkbox
        //       value={value}
        //       block={true}
        //       label={checkLabel}
        //       onChange={(e) => {
        //         onChange(e.target.checked);
        //       }}
        //     />
        //   )}
        // />,
        // <Controller
        //   control={control}
        //   name="ch.0"
        //   defaultValue={true}
        //   render={({ field: { value, onChange } }) => (
        //     <Checkbox
        //       value={value}
        //       block={true}
        //       label={checkLabel}
        //       onChange={(e) => {
        //         onChange(e.target.checked);
        //       }}
        //     />
        //   )}
        // />,
        // <Controller
        //   control={control}
        //   name="ch.1"
        //   defaultValue={true}
        //   render={({ field: { value, onChange } }) => (
        //     <Checkbox
        //       value={value}
        //       block={true}
        //       label={checkLabel}
        //       onChange={(e) => {
        //         onChange(e.target.checked);
        //       }}
        //     />
        //   )}
        // />,
        // <Controller
        //   control={control}
        //   name="ch.2"
        //   defaultValue={false}
        //   render={({ field: { value, onChange } }) => (
        //     <Checkbox
        //       value={value}
        //       block={true}
        //       label={checkLabel}
        //       onChange={(e) => {
        //         onChange(e.target.checked);
        //       }}
        //     />
        //   )}
        // />,
        // <CheckboxGroup
        //   errorMessage={errors.pnh?.message}
        //   htmlTitle={`<div>------------</div>`}
        // >
        //   <Controller
        //     control={control}
        //     name="pnh.option0"
        //     defaultValue={true}
        //     // rules={{ required: true }}
        //     render={({ field: { value, onChange } }) => (
        //       <Checkbox
        //         value={value}
        //         block={true}
        //         label={checkLabel}
        //         onChange={(e) => {
        //           onChange(e.target.checked);
        //         }}
        //       />
        //     )}
        //   />
        //   <Controller
        //     control={control}
        //     name="pnh.option1"
        //     defaultValue={true}
        //     // rules={{ required: true }}
        //     render={({ field: { value, onChange } }) => (
        //       <Checkbox
        //         value={value}
        //         block={true}
        //         label={checkLabel}
        //         onChange={(e) => {
        //           onChange(e.target.checked);
        //         }}
        //       />
        //     )}
        //   />
        //   <Controller
        //     control={control}
        //     name="pnh.option2"
        //     defaultValue={false}
        //     // rules={{ required: true }}
        //     render={({ field: { value, onChange } }) => (
        //       <Checkbox
        //         value={value}
        //         block={true}
        //         label={checkLabel}
        //         onChange={(e) => {
        //           onChange(e.target.checked);
        //         }}
        //       />
        //     )}
        //   />
        // </CheckboxGroup>,
      ],
    },
    // {
    //   name: "step_3",
    //   nameFields: ["username5", "username6"],
    //   fields: [
    //     <Input
    //       placeholder="Имя"
    //       htmlTitle={html}
    //       type="text"
    //       id="username5"
    //       block
    //       error={errors.username5?.message}
    //       {...register("username5", {
    //         required: {
    //           value: true,
    //           message: "Поле username5 обязательно",
    //         },
    //       })}
    //     />,
    //     <Input
    //       placeholder="Фамилия"
    //       htmlTitle={html}
    //       type="text"
    //       id="username6"
    //       block
    //       error={errors.username6?.message}
    //       {...register("username6", {
    //         required: {
    //           value: true,
    //           message: "Поле username6 обязательно",
    //         },
    //       })}
    //     />,
    //     <Controller
    //       control={control}
    //       name="check2"
    //       defaultValue={false}
    //       render={({ field: { value, onChange } }) => (
    //         <Checkbox
    //           value={value}
    //           block={true}
    //           label={checkLabel}
    //           onChange={(e) => {
    //             onChange(e.target.checked);
    //           }}
    //         />
    //       )}
    //     />,
    //     <Controller
    //       control={control}
    //       name="step3ch.0"
    //       defaultValue={true}
    //       render={({ field: { value, onChange } }) => (
    //         <Checkbox
    //           value={value}
    //           block={true}
    //           label={checkLabel}
    //           onChange={(e) => {
    //             onChange(e.target.checked);
    //           }}
    //         />
    //       )}
    //     />,
    //     <Controller
    //       control={control}
    //       name="step3ch.1"
    //       defaultValue={true}
    //       render={({ field: { value, onChange } }) => (
    //         <Checkbox
    //           value={value}
    //           block={true}
    //           label={checkLabel}
    //           onChange={(e) => {
    //             onChange(e.target.checked);
    //           }}
    //         />
    //       )}
    //     />,
    //     <Controller
    //       control={control}
    //       name="step3ch.2"
    //       defaultValue={false}
    //       render={({ field: { value, onChange } }) => (
    //         <Checkbox
    //           value={value}
    //           block={true}
    //           label={checkLabel}
    //           onChange={(e) => {
    //             onChange(e.target.checked);
    //           }}
    //         />
    //       )}
    //     />,
    //     <CheckboxGroup
    //       errorMessage={errors.pnh?.message}
    //       htmlTitle={`<div>------------</div>`}
    //     >
    //       <Controller
    //         control={control}
    //         name="step3pnh.option0"
    //         defaultValue={true}
    //         // rules={{ required: true }}
    //         render={({ field: { value, onChange } }) => (
    //           <Checkbox
    //             value={value}
    //             block={true}
    //             label={checkLabel}
    //             onChange={(e) => {
    //               onChange(e.target.checked);
    //             }}
    //           />
    //         )}
    //       />
    //       <Controller
    //         control={control}
    //         name="step3pnh.option1"
    //         defaultValue={true}
    //         // rules={{ required: true }}
    //         render={({ field: { value, onChange } }) => (
    //           <Checkbox
    //             value={value}
    //             block={true}
    //             label={checkLabel}
    //             onChange={(e) => {
    //               onChange(e.target.checked);
    //             }}
    //           />
    //         )}
    //       />
    //       <Controller
    //         control={control}
    //         name="step3pnh.option2"
    //         defaultValue={false}
    //         // rules={{ required: true }}
    //         render={({ field: { value, onChange } }) => (
    //           <Checkbox
    //             value={value}
    //             block={true}
    //             label={checkLabel}
    //             onChange={(e) => {
    //               onChange(e.target.checked);
    //             }}
    //           />
    //         )}
    //       />
    //     </CheckboxGroup>,
    //   ],
    // },
  ];

  return (
    <Steps
      steps={steps}
      trigger={trigger}
      reset={reset}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};
