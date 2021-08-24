import React, {Component} from "react";
import Axios from "axios";
import {Field, Formik} from "formik";
import Button from "../../../../BaseElements/Button/Button";
import {API} from "../../../../../const";
import * as Yup from "yup";
import CommunitySelect from "../../../../BaseElements/Inputs/SelectForField/CommunitySelect/CommunitySelect";
import LetterSelect from "../../../../BaseElements/Inputs/SelectForField/LetterSelect/LetterSelect";
import DateField from "../../../../BaseElements/Inputs/DateField/DateField";
import CatSelect from "../../../../BaseElements/Inputs/SelectForField/CatSelect/CatSelect";
import {litterUpdater} from "../AdminLittersPage";
import apiRequest from '../../../../../services/api_connect'

class LitterEditForm extends Component {

    templateDataSet(template, data) {
        for (let key in template) {
            if (typeof template[key] === "object" && template[key]) {
                template[key] = this.templateDataSet(template[key], data[key]);
            } else {
                if (typeof data[key] === "object" && data[key]) {
                    template[key] = data[key].id;
                } else {
                    template[key] = data[key];
                }
            }
        }
        return template;
    }

    render() {
        let values = {
            id: null,
            birthday: null,
            cats: [],
            community: null,
            father: null,
            letter: null,
            mother: null
        };
        if (this.props.litter) {
            values = this.templateDataSet(values, this.props.litter);
        }
        return (
            <Formik
                enableReinitialize={true}
                initialValues={values}
                validationSchema={
                    Yup.object().shape({
                        id: Yup.number().nullable(),
                        birthday: Yup.date().nullable().required("Нужно заполнить это поле"),
                        community: Yup.number().nullable().required("Нужно заполнить это поле"),
                        father: Yup.number().nullable(),
                        mother: Yup.number().nullable(),
                        letter: Yup.string().nullable().required("Нужно заполнить это поле"),
                    })}
                onSubmit={(values, {setSubmitting}) => {
                    if (values.id) {
                        apiRequest(API.LITTER(this.props.litter.id), { data: values },'PUT').then(() => {
                            litterUpdater();
                            this.props.modal.closeModal();
                        }).catch((e) => {
                            console.error(e);
                            alert("Произошла ошибка при обновлении");
                        });
                    } else {
                        apiRequest(API.LITTER(), { data: values }, 'POST').then(() => {
                            litterUpdater();
                            this.props.modal.closeModal();
                        }).catch((e) => {
                            console.error(e);
                            alert("Произошла ошибка при создании");
                        });
                    }
                }}
            >
                {({setFieldValue, handleSubmit, resetForm, setValues}) => (
                    <form className={"form"} onSubmit={handleSubmit}>
                        <h3>Форма создания или обновления помета</h3>
                        <label>Буква<Field
                            name="letter"
                            component={LetterSelect}
                            placeholder="Выберите букву"/></label>
                        <label>Дата рождения<br/><Field
                            name="birthday"
                            component={DateField}
                            placeholder="Выберите дату рождения"/></label>
                        <label>Мать<Field
                            name="mother"
                            params={{
                                criteria: {
                                    gender: 'female'
                                },
                                order: {name: 'asc'}
                            }}
                            component={CatSelect}
                            placeholder="Выберите мать"/></label>
                        <label>Отец<Field
                            name="father"
                            params={{
                                criteria: {
                                    gender: 'male'
                                },
                                order: {name: 'asc'}
                            }}
                            component={CatSelect}
                            placeholder="Выберите отца"/></label>
                        <label>Питомник<Field
                            name="community"
                            component={CommunitySelect}
                            placeholder="Выберите питомник"/></label>
                        <br/>
                        <Button color={"white"}>Сохранить</Button>
                    </form>
                )}
            </Formik>
        );
    }
}

export default LitterEditForm;
