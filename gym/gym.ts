class Gym {
    getTreadmillSession(camel: Camel) {
        return new TrainSession(
            camel.camelSkills.sprintSpeed, 
            camel.camelSkills.stamina.skillValue);
    }

    getSpaSession(camel: Camel) {
        if (cashMoney >= 50) {
            cashMoney += -50;
            return new SpaSession(
                camel.camelSkills.stamina);
        }
    }
}