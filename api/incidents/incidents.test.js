/* eslint-disable */
const { internet } = require('faker');
const { ExpectationFailed } = require('http-errors');
const db = require('../../data/db-config');
const Incidents = require('./incidentsModel');

//returns an array of dummy incidents to use for testing
function getTestIncidents() {
  let incident1 = {
    state: 'Washington',
    city: 'Olympia',
    desc:
      'Footage shows a few individuals break off from a protest to smash City Hall windows. Protesters shout at vandals to stop.\n\nPolice then arrive. They arrest multiple individuals near the City Hall windows, including one individual who appeared to approach the vandals in an effort to defuse the situation.\n\nPolice fire tear gas and riot rounds at protesters during the arrests. Protesters become agitated.\n\nAfter police walk arrestee away, protesters continue to shout at police. Police respond with a second bout of tear gas and riot rounds.\n\nA racial slur can be heard shouted, although it is unsure who is shouting.',
    title: 'Police respond to broken windows with excessive force',
    date: '2020-05-31',
    id: 'wa-olympia-1',
    lat: 47.0417,
    long: -122.8959,
  };
  let incident2 = {
    state: 'Washington',
    city: 'Seattle',
    desc:
      'Officer pins protester with his knee on his neck. His partner intervenes and moves his knee onto the individual\'s back.\n\nPossibly related to OPD Case 2020OPA-0324 - "Placing the knee on the neck area of two people who had been arrested"',
    title: 'Officer pins protester by pushing his knee into his neck',
    date: '2020-05-30',
    id: 'wa-seattle-1',
    lat: 47.6211,
    long: -122.3244,
  };
  let incident3 = {
    state: 'Washington',
    city: 'Seattle',
    desc:
      'In this video, officers wrestle with two protesters on the floor. One officer punches the protester he has pinned at 0:15.',
    title: 'Law enforcement officer punches pinned protester',
    date: '2020-05-31',
    id: 'wa-seattle-12',
    lat: 47.6211,
    long: -122.3244,
  };
  let incident4 = {
    state: 'Washington',
    city: 'Seattle',
    desc:
      'Police are standing in a row holding bikes and pepper spray canisters. Protesters are standing in front of them with their hands in the air. Police begin moving forward, using their bikes as shields, in sync with flashbangs. Several officers in grey move closer to the protesters and shoot flashbangs directly into the crowd. Flashbangs continue as protesters walk away, and tear gas is visible.',
    title: 'Law enforcement officers throw flashbangs into peaceful crowd',
    date: '2020-05-31',
    id: 'wa-seattle-7',
    lat: 47.6211,
    long: -122.3244,
  };
  return [incident1, incident2, incident3, incident4];
}

//async forEach method
async function asyncForEach(array, cb) {
  for (let i = 0; i < array.length; i++) {
    await cb(array[i], i, array);
  }
}

describe('incidentsModel', () => {
  //wipes all tables in database clean so each test starts with empty tables
  beforeEach(async () => {
    //db is the knex initialized object using db.raw to truncate postgres tables with foreign keys
    //can use knex.raw but it is global and deprecated
    await db.raw('TRUNCATE TABLE incidents RESTART IDENTITY CASCADE');
    await db.raw('TRUNCATE TABLE sources RESTART IDENTITY CASCADE');
    await db.raw(
      'TRUNCATE TABLE incident_type_of_force RESTART IDENTITY CASCADE'
    );

    await db.raw('TRUNCATE TABLE type_of_force RESTART IDENTITY CASCADE');
  });

  describe('getAllIncidents', () => {
    it('gets an empty array of users from empty db', async () => {
      const incidents = await Incidents.getAllIncidents();
      expect(incidents).toHaveLength(0);
    });

    it('gets an array of incidents from a non-empty db', async () => {
      let incidents = getTestIncidents();

      await asyncForEach(incidents, async (incident) => {
        await db('incidents').insert(incident);
      });

      const dbIncidents = await Incidents.getAllIncidents();
      expect(dbIncidents).toHaveLength(4);
    });
  });

  describe('createIncident(incident)', () => {
    it('adds new incident to empty db', async () => {
      let incidents = getTestIncidents();
      let incident = incidents[0];
      incident.src = ['Twitter'];
      incident.tags = ['hard, projectiles'];

      await Incidents.createIncident(incident);

      const dbIncidents = await db('incidents');

      expect(dbIncidents).toHaveLength(1);
    });
  });
});
