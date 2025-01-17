import { Stepper, Step, StepIndicator, StepStatus, StepNumber, StepIcon, Box, StepSeparator, StepTitle, StepDescription, useSteps, Flex, Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import Form1 from "./Form1";
import { useState } from "react";
import Form3 from "./Form3";
import Form2 from "./Form2";
import Form4 from "./Form4";


const steps = [
    { title: 'First', description: 'Personal Details' },
    { title: 'Second', description: 'Physical Attributes' },
    { title: 'Third', description: 'Health Info' },
 
];
const DonorApplication = () => {

    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    })
    const [currentPage, setPageNo] = useState(0)
    const handleNext = () => {
        let i = currentPage;
        i++;
        setPageNo(i)
        setActiveStep(i)
    }

    const handleBack = () =>{
        let j=currentPage
        j--
        setPageNo(j)
        setActiveStep(j)
    }

    const toast = useToast()
    const navigate= useNavigate()
    const handleSubmit = () => {
        toast({
            title: "Registered Successfully",
            status: "success",
            isClosable: true,
            position: "top",
        })
        navigate(`/donors`)

    }

    const [formData1, setFormData1] = useState({});
    const [formData2, setFormData2] = useState({});
    const [formData3, setFormData3] = useState({});
    
    const handleForm1Submit = () =>{
        setFormData1(formData1)
    }
    const handleForm2Submit = () =>{
        setFormData2(formData2)
    }
    const handleForm3Submit = () =>{
        setFormData3(formData3)
    }
  
    return (
        <>
            <Flex direction={'column'} h={'100vh'} p={10} alignItems={'center'}>
                <Stepper size='md' index={activeStep} gap={10} w={1100} mb={12} mt={7}>
                    {steps.map((step, index) => (
                        <Step key={index} onClick={() => setActiveStep(index)}>
                            <StepIndicator>
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />
                            </StepIndicator>

                            <Box flexShrink='0'>
                                <StepTitle>{step.title}</StepTitle>
                                <StepDescription>{step.description}</StepDescription>
                            </Box>

                            <StepSeparator />
                        </Step>
                    ))}
                </Stepper>

                {currentPage == 0 ? <Form1 /> : currentPage == 1 ? <Form2 /> :  <Form3 />}
                <Flex w={600} alignItems={'center'} mt={5} gap={5} justify={'center'}>
                    {currentPage!=0?<Button colorScheme="blue" onClick={() => handleBack()}>Back</Button>:""}
                    {currentPage < 2 ? <Button colorScheme="blue" onClick={() => handleNext()}>Next</Button> : <Button colorScheme="green" onClick={() => handleSubmit()} >Submit</Button>}
                </Flex>
            </Flex>
        </>
    );
}

export default DonorApplication;