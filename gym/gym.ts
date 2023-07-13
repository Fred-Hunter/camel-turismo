class Gym {
    static getTreadmillSession(camel: Camel) {
        return new TrainSession(
            camel.sprintSpeed, 
            camel.stamina.level);
    }

    getSpaSession(camel: Camel) {
        if (cashMoney >= 50) {
            cashMoney += -50;
            return new SpaSession(
                camel.stamina);
        }
    }
}
