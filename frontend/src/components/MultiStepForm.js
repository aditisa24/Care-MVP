import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { findFacilityMatch } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import Header from "../screens/Header";
import Footer from "../screens/Footer";




const step1Schema = yup.object().shape({
    name: yup.string().required("Patient name is required"),
});

const step2Schema = yup.object().shape({
    careType: yup.string().required("Select a type of care"),
});

const step3Schema = yup.object().shape({
    zipCode: yup
        .number()
        .typeError("Zip code must be a number")
        .min(10000, "Zip code must be 5 digits")
        .max(99999, "Zip code must be 5 digits")
        .required("Zip code is required"),
});

const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ name: "", careType: "", zipCode: "" });
    const [matchResult, setMatchResult] = useState(null);

    const schemas = [step1Schema, step2Schema, formData.careType !== "daycare" ? step3Schema : null];

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue
    } = useForm({
        resolver: yupResolver(schemas[step - 1]),
        defaultValues: formData,
        mode: "onBlur",
    });

    const careType = watch("careType");

    const nextStep = async () => {
        try {
            await schemas[step - 1].validate(formData);

            // If the user selects "daycare", show a toast and prevent going to the next step
            if (step === 2 && formData.careType === "daycare") {
                toast.error("Day Care is not available at the moment.", { position: "top-right" });
                return;
            }

            setStep(step + 1);
        } catch (error) {
            console.log(error);
        }
    };

    const prevStep = () => setStep(step - 1);

    const onSubmit = async (data) => {
        console.log("Submitting Data:", data);
        const matchResponse = await findFacilityMatch(data);
        setMatchResult(matchResponse);
    };

    return (
        <div>
        <Header />
        <div className="form-container">
            <ToastContainer />
            
            <h2>Step {step} of 3</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {step === 1 && (
                    <div>
                        <label>Patient Name:</label>
                        <input
                            {...register("name")}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        {errors.name && <p className="error">{errors.name.message}</p>}
                        <button type="button" onClick={nextStep}>Next</button>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <label>Type of Care:</label>
                        <select
                            {...register("careType")}
                            value={formData.careType}
                            onChange={(e) => {
                                setFormData({ ...formData, careType: e.target.value });
                                setValue("zipCode", ""); // Reset zip code if care type changes
                            }}
                        >
                            <option value="">Select</option>
                            <option value="stationary">Stationary</option>
                            <option value="ambulatory">Ambulatory</option>
                            <option value="daycare">Day Care</option>
                        </select>
                        {errors.careType && <p className="error">{errors.careType.message}</p>}
                        <button type="button" onClick={prevStep}>Back</button>
                        <button type="button" onClick={nextStep}>Next</button>
                    </div>
                )}

                {step === 3 && formData.careType !== "daycare" && (
                    <div>
                        <label>Zip Code:</label>
                        <input
                            {...register("zipCode")}
                            value={formData.zipCode}
                            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        />
                        {errors.zipCode && <p className="error">{errors.zipCode.message}</p>}
                        <button type="button" onClick={prevStep}>Back</button>
                        <button type="submit">Submit</button>
                    </div>
                )}
            </form>

            {matchResult && (
                <div className="match-result">
                    {matchResult.match ? (
                        <div>
                            <h3>Matched Facility</h3>
                            <p>Name: {matchResult.facility.name}</p>
                            <p>Type: {matchResult.facility.type}</p>
                            <p>Location: {matchResult.facility.facilityZipCode}</p>
                        </div>
                    ) : (
                        <p className="error">{matchResult.message}</p>
                    )}
                </div>
            )}
        </div>
        <Footer />
        </div>
    );
};

export default MultiStepForm;
