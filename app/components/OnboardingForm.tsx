import React, { useState } from 'react';
import { Field, Label } from './fieldset';
import { Input } from './input';
import { Button } from './button';
import { Checkbox, CheckboxField, CheckboxGroup } from './checkbox';
import { Radio, RadioField, RadioGroup } from './radio'
import { motion } from 'framer-motion';
import { ForwardIcon, PaperAirplaneIcon } from '@heroicons/react/16/solid';

const categoryOptions = ['Video', 'Audio', 'Text'];
const resolutionOptions = ['SD', 'HD', 'UHD'];
const platformOptions = ['Search engines', 'By a friend', 'Reddit'];

function OnboardingForm() {
  const [step, setStep] = useState(0); // Track the current step
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Track selected categories
  const [selectedResolutions, setSelectedResolutions] = useState<string[]>([]); // Track selected resolutions
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]); // Track preferred platforms
  const [isSubmitted, setIsSubmitted] = useState(false); // Track form submission state

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  // Sliding animation variants
  const slideVariants = {
    hidden: { x: 300, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 },
  };

  const mockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 3) {
      setIsSubmitted(true); // Mark the form as submitted
    } else {
      nextStep();
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }} // Start hidden
        animate={{ opacity: 1 }} // Fade in
        transition={{ duration: 0.5 }} // Animation duration
      >
        <meta http-equiv="refresh" content="1;URL='/'" />
        <h1 className="text-3xl font-serif text-gray-800">Form Completed!</h1>
        <p className="text-lg text-gray-600 mt-4 font-serif">
          Thank you for filling out the form.<br />
          We will redirect you shortly to your dashboard.
        </p>
      </motion.div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={mockSubmit}>
      <h1 className="text-3xl text-gray-800 dark:text-white mb-4 font-serif">
        We'd like to know more about you
      </h1>
      <p className="text-gray-600 mb-6">
        Please fill out the form below to help us understand your preferences.
      </p>
      <motion.div
        key={step} // Ensures animation occurs between step transitions
        variants={slideVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.5 }}
      >
        {step === 0 && (
          <>
            <Field>
              <Label htmlFor="fullName">Preferred Username</Label>
              <Input id="fullName" placeholder="What's your name?" />
            </Field>
            <Field>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Create a password" />
            </Field>
          </>
        )}

        {step === 1 && (
          <Field>
            <Label htmlFor="interests">What are you interested in?</Label>
            <CheckboxGroup role="group" aria-label="Discoverability">
              {categoryOptions.map((option) => (
                <CheckboxField key={option}>
                  <Checkbox
                    name={option}
                    checked={selectedCategories.includes(option)}
                    onChange={(checked) => {
                      setSelectedCategories((pending) =>
                        checked ? [...pending, option] : pending.filter((item) => item !== option)
                      );
                    }}
                  />
                  <Label>{option}</Label>
                </CheckboxField>
              ))}
            </CheckboxGroup>
          </Field>
        )}

        {step === 2 && (
          <Field>
            <Label htmlFor="resolution">Preferred Resolution</Label>
            <CheckboxGroup role="group" aria-label="Resolution">
              {resolutionOptions.map((option) => (
                <CheckboxField key={option}>
                  <Checkbox
                    name={option}
                    checked={selectedResolutions.includes(option)}
                    onChange={(checked) => {
                      setSelectedResolutions((pending) =>
                        checked ? [...pending, option] : pending.filter((item) => item !== option)
                      );
                    }}
                  />
                  <Label>{option}</Label>
                </CheckboxField>
              ))}
            </CheckboxGroup>
          </Field>
        )}

        {step === 3 && (
          <Field>
            <Label htmlFor="platform">From where did you hear about us?</Label>
            <RadioGroup name="platform" defaultValue={selectedPlatforms[0]}>
              {platformOptions.map((option) => (
                <RadioField key={option}>
                  <Radio
                    value={option}
                    checked={selectedPlatforms.includes(option)}
                    onChange={() => {
                      setSelectedPlatforms([option]); // Set the selected platform
                    }}
                  />
                  <Label>{option}</Label>
                </RadioField>
              ))}
            </RadioGroup>
          </Field>
        )}

      </motion.div>

      <div className="mt-4 flex items-center space-x-2">
        {step > 0 && (
          <Button type="button" color="light" onClick={prevStep}>
            <ForwardIcon style={{ transform: 'rotate(180deg)' }} /> Back
          </Button>
        )}
        {step < 3 && (
          <Button type="submit" color="light">
            <ForwardIcon /> Next
          </Button>
        )}
        {step === 3 && (
          <Button type="submit" color="green">
            <PaperAirplaneIcon /> Submit
          </Button>
        )}
      </div>
    </form>
  );
}

export default OnboardingForm;