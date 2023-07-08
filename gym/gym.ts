class Gym {
    getTreadmillSession(camel: Camel) {
        return new TrainSession(
            camel.camelSkills.sprintSpeed, 
            camel.camelSkills.stamina.skillValue);
    }

    getSpaSession(camel: Camel) {
        // Take Away Money
        return new SpaSession(
            camel.camelSkills.stamina);
    }
}