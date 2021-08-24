import React, {Component} from "react";
import * as Yup from "yup";
import Axios from "axios";
import {Field, Formik} from "formik";
import InputForField from "../../../../BaseElements/Inputs/InputForField/InputForField";
import BreedSelect from "../../../../BaseElements/Inputs/SelectForField/BreedSelect/BreedSelect";
import BaseColorSelect from "../../../../BaseElements/Inputs/SelectForField/BaseColorSelect/BaseColorSelect";
import ColorCodeSelect from "../../../../BaseElements/Inputs/SelectForField/ColorCodeSelect/ColorCodeSelect";
import LitterSelect from "../../../../BaseElements/Inputs/SelectForField/LitterSelect/LitterSelect";
import StatusSelect from "../../../../BaseElements/Inputs/SelectForField/StatusSelect/StatusSelect";
import CommunitySelect from "../../../../BaseElements/Inputs/SelectForField/CommunitySelect/CommunitySelect";
import GenderSelect from "../../../../BaseElements/Inputs/SelectForField/GenderSelect/GenderSelect";
import OwnerSelect from "../../../../BaseElements/Inputs/SelectForField/OwnerSelect/OwnerSelect";
import TitleSelect from "../../../../BaseElements/Inputs/SelectForField/TitleSelect/TitleSelect";
import ClassSelect from "../../../../BaseElements/Inputs/SelectForField/ClassSelect/ClassSelect";
import Button from "../../../../BaseElements/Button/Button";
import {API} from "../../../../../const";
import "./CatEditForm.css";
import {catUpdater} from "../AdminCatsPage";
import apiRequest from '../../../../../services/api_connect'

class CatEditForm extends Component {

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
            name: '',
            color: {
                breed: null,
                baseColor: null,
                baseColorAdditional: null,
                code0: null,
                code1: null,
                code2: null,
                code3: null,
                tail: null,
                eyes: null,
                ears: null,
            },
            litter: null,
            status: "",
            community: null,
            gender: null,
            owner: null,
            title: null,
            catClass: null
        };
        if (this.props.cat) {
            values = this.templateDataSet(values, this.props.cat);
        }
        return (
            <Formik
                enableReinitialize={true}
                initialValues={values}
                validationSchema={Yup.object().shape({
                    id: Yup.number().nullable(),
                    name: Yup.string().required("Нужно заполнить это поле"),
                    color: Yup.object().shape({
                        breed: Yup.number().nullable().required("Нужно заполнить это поле"),
                        baseColor: Yup.number().nullable().required("Нужно заполнить это поле"),
                        baseColorAdditional: Yup.number().nullable(),
                        code0: Yup.number().nullable(),
                        code1: Yup.number().nullable(),
                        code2: Yup.number().nullable(),
                        code3: Yup.number().nullable(),
                        tail: Yup.number().nullable(),
                        eyes: Yup.number().nullable(),
                        ears: Yup.number().nullable()
                    }),
                    litter: Yup.number().nullable().required("Нужно заполнить это поле"),
                    status: Yup.string().nullable().required("Нужно заполнить это поле"),
                    community: Yup.number().nullable(),
                    gender: Yup.string().nullable().required("Нужно заполнить это поле"),
                    owner: Yup.number().nullable(),
                    title: Yup.number().nullable(),
                    catClass: Yup.number().nullable()
                })}
                onSubmit={(values, {setSubmitting}) => {
                    if (values.id) {
                        apiRequest(API.CAT(values.id), {data: values }, 'PUT').then(() => {
                            catUpdater();
                            this.props.modal.closeModal();
                        }).catch((e) => {
                            console.error(e);
                            alert("Произошла ошибка при обновлении");
                        });
                    } else {
                        apiRequest(API.CAT(), {data: values },'POST').then(() => {
                            catUpdater();
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
                        <h3>Форма создания или обновления котика</h3>
                        <label>Имя<Field
                            name="name"
                            component={InputForField}
                            placeholder="Укажите имя"/></label>
                        <label>Помет<Field
                            name="litter"
                            component={LitterSelect}
                            placeholder="Выберите помет из списка"/></label>
                        <label>Статус<Field
                            name="status"
                            component={StatusSelect}
                            placeholder="Выберите статус из списка"/></label>
                        <label>Пол<Field
                            name="gender"
                            component={GenderSelect}
                            placeholder="Выберите пол"/></label>
                        <label>Хозяин<Field
                            name="owner"
                            component={OwnerSelect}
                            placeholder="Выберите хозяина из списка"/></label>
                        <label>Титул<Field
                            name="title"
                            component={TitleSelect}
                            placeholder="Выберите титул из списка"/></label>
                        <label>Класс<Field
                            name="catClass"
                            component={ClassSelect}
                            placeholder="Выберите класс животного"/></label>
                        <label>Дополнительный питомник<Field
                            name="community"
                            params={{nullable: true}}
                            component={CommunitySelect}
                            placeholder="Выберите питомник из списка"/></label>
                        <br/>
                        <div>
                            <h4>Окрас</h4>
                            <label>Порода<Field
                                name="color.breed"
                                component={BreedSelect}
                                placeholder="Выберите породу"/></label>
                            <label>Основной цвет<Field
                                name="color.baseColor"
                                component={BaseColorSelect}
                                placeholder="Выберите основной цвет"/></label>
                            <label>Дополнительный цвет<Field
                                name="color.baseColorAdditional"
                                component={BaseColorSelect}
                                params={{nullable: true}}
                                placeholder="Выберите дополнительный цвет"/></label>
                            <label>Код окраса начинающийся с 0<Field
                                name="color.code0"
                                params={{custom: {firstNumber: 0}}}
                                component={ColorCodeSelect}/></label>
                            <label>Код окраса начинающийся с 1<Field
                                name="color.code1"
                                params={{custom: {firstNumber: 1}}}
                                component={ColorCodeSelect}/></label>
                            <label>Код окраса начинающийся с 2<Field
                                name="color.code2"
                                params={{custom: {firstNumber: 2}}}
                                component={ColorCodeSelect}/></label>
                            <label>Код окраса начинающийся с 3<Field
                                name="color.code3"
                                params={{custom: {firstNumber: 3}}}
                                component={ColorCodeSelect}/></label>
                            <label>Тип хвоста<Field
                                name="color.tail"
                                params={{custom: {firstNumber: 5}}}
                                component={ColorCodeSelect}/></label>
                            <label>Цвет глаз<Field
                                name="color.eyes"
                                params={{custom: {firstNumber: 6}}}
                                component={ColorCodeSelect}/></label>
                            <label>Тип ушей<Field
                                name="color.ears"
                                params={{custom: {firstNumber: 7}}}
                                component={ColorCodeSelect}/></label>
                        </div>
                        <Button color={"white"}>Сохранить</Button>
                    </form>

                )}
            </Formik>
        );
    }
}

export default CatEditForm;
