package nl.hanze.se4.automaat.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class RentalAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertRentalAllPropertiesEquals(Rental expected, Rental actual) {
        assertRentalAutoGeneratedPropertiesEquals(expected, actual);
        assertRentalAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertRentalAllUpdatablePropertiesEquals(Rental expected, Rental actual) {
        assertRentalUpdatableFieldsEquals(expected, actual);
        assertRentalUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertRentalAutoGeneratedPropertiesEquals(Rental expected, Rental actual) {
        assertThat(expected)
            .as("Verify Rental auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertRentalUpdatableFieldsEquals(Rental expected, Rental actual) {
        assertThat(expected)
            .as("Verify Rental relevant properties")
            .satisfies(e -> assertThat(e.getCode()).as("check code").isEqualTo(actual.getCode()))
            .satisfies(e -> assertThat(e.getLongitude()).as("check longitude").isEqualTo(actual.getLongitude()))
            .satisfies(e -> assertThat(e.getLatitude()).as("check latitude").isEqualTo(actual.getLatitude()))
            .satisfies(e -> assertThat(e.getFromDate()).as("check fromDate").isEqualTo(actual.getFromDate()))
            .satisfies(e -> assertThat(e.getToDate()).as("check toDate").isEqualTo(actual.getToDate()))
            .satisfies(e -> assertThat(e.getState()).as("check state").isEqualTo(actual.getState()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertRentalUpdatableRelationshipsEquals(Rental expected, Rental actual) {
        assertThat(expected)
            .as("Verify Rental relationships")
            .satisfies(e -> assertThat(e.getCustomer()).as("check customer").isEqualTo(actual.getCustomer()))
            .satisfies(e -> assertThat(e.getCar()).as("check car").isEqualTo(actual.getCar()));
    }
}
