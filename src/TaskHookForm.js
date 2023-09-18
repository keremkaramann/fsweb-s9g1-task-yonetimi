import React from "react";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";

const TaskHookForm = ({ kisiler, submitFn }) => {
  //////!react hook form here
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      people: [],
      status: "yapılacak",
    },
    mode: "all",
  });

  const validatePeople = () => {
    const selectedPeople = getValues("people");
    if (selectedPeople.length === 0) {
      return "Lütfen en az bir kişi seçin";
    } else if (selectedPeople.length > 3) {
      return "En fazla 3 kişi seçebilirsiniz";
    } else {
      return true;
    }
  };

  const onSubmit = (formdata, e) => {
    submitFn({ ...formdata, id: nanoid(5) });
    e.target.reset();
  };

  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          name="title"
          type="text"
          {...register("title", {
            required: "Task başlığı yazmalısınız",
            minLength: {
              value: 3,
              message: "Task başlığı en az 3 karakter olmalı",
            },
          })}
        />
        {errors.title && <p className="input-error">{errors.title?.message}</p>}
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          name="description"
          {...register("description", {
            required: "Task açıklaması yazmalısınız",
            minLength: {
              value: 10,
              message: "Task açıklaması en az 10 karakter olmalı",
            },
          })}
        ></textarea>
        {errors.description && (
          <p className="input-error">{errors.description?.message}</p>
        )}
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                name="people"
                value={p}
                {...register("people", {
                  validate: validatePeople,
                })}
              />
              {p}
            </label>
          ))}
        </div>
        {errors.people && (
          <p className="input-error">{errors.people?.message}</p>
        )}
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>
      </div>
    </form>
  );
};

export default TaskHookForm;
