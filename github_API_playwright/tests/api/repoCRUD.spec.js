const { test, expect } = require('@playwright/test');
const testData = require('../../utils/testData');
require('dotenv').config();

const BASE_URL = process.env.BASE_URL;
const USERNAME = process.env.USERNAME;
const TOKEN = process.env.TOKEN;
const REPO = process.env.REPO;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: 'application/vnd.github+json'
};

// const updateData = [
//   { desc: "Updated via API" },
//   { desc: "Second Update" }
// ];

test.describe.serial('GitHub CRUD Flow', () => {

  // ---------- CREATE ----------
  test('Create Repo - Positive', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/user/repos`, {
      headers,
      data: {
        name: REPO,
        private: false
      }
    });

    expect(res.status()).toBe(201);
    console.log("Repo created successfully");
    console.log("Repo Name: " + (await res.json()).name);
    console.log("Repo URL: " + (await res.json()).html_url);
    console.log("Repo Created At: " + (await res.json()).created_at);
    console.log("Repo Private: " + (await res.json()).private);
    
  });

  // Negative Create
  test('Create Repo - Negative', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/user/repos`, {
      headers,
      data: { name: "" }
    });

    expect(res.status()).toBe(422);
    console.log("Repo creation failed as expected with status: " + res.status());
    console.log("Error Message: " + (await res.json()).message);
    console.log("Errors: " + JSON.stringify((await res.json()).errors));
    
  });

  // ---------- GET ----------
  test('Get Repo - Positive', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/repos/${USERNAME}/${REPO}`, { headers });
    expect(res.status()).toBe(200);
    console.log("Repo fetched successfully");
    console.log("Repo Name: " + (await res.json()).name);
    console.log("Repo Created At: " + (await res.json()).created_at);
  });

  test('Get Repo - Negative', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/repos/${USERNAME}/invalid-repo`, { headers });
    expect(res.status()).toBe(404);
    console.log("Repo not found as expected with status: " + res.status());
    console.log("Error Message: " + (await res.json()).message);

  });

  // ---------- UPDATE ----------
  // updateData.forEach(({ desc }) => {

  //   test(`Update Repo - ${desc}`, async ({ request }) => {

  //     const res = await request.patch(`${BASE_URL}/repos/${USERNAME}/${REPO}`, {
  //       headers,
  //       data: { description: desc }
  //     });

  //     expect(res.status()).toBe(200);

  //     const body = await res.json();
  //     expect(body.description).toBe(desc);
      //console.log("Repo description updated successfully to: " + body.description);

      // ---------- UPDATE (DDT) ----------

testData.updateData.forEach(({ desc }) => {

  test(`Update Repo Description - ${desc}`, async ({ request }) => {

    const res = await request.patch(`${BASE_URL}/repos/${USERNAME}/${REPO}`, {
      headers,
      data: { description: desc }
    });

    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body.description).toBe(desc);
    console.log("Repo description updated successfully to: " + body.description);
    console.log("Repo Name: " + body.name);
    console.log("Repo Updated At: " + body.updated_at);
  });

});
   
  

  

  // ---------- DELETE ----------
  test('Delete Repo - Positive', async ({ request }) => {
    const res = await request.delete(`${BASE_URL}/repos/${USERNAME}/${REPO}`, { headers });
    expect(res.status()).toBe(204);
    console.log("Repo deleted successfully");
    console.log("Repo Name: " + REPO);
    
    // Verify deletion
    const verifyRes = await request.get(`${BASE_URL}/repos/${USERNAME}/${REPO}`, { headers });
    expect(verifyRes.status()).toBe(404); 
    console.log("Repo deletion verified successfully with status: " + verifyRes.status());
    console.log("Error Message: " + (await verifyRes.json()).message);
    console.log("Repo Name: " + (await verifyRes.json()).name);
  
  });

  test('Delete Repo - Negative', async ({ request }) => {
    const res = await request.delete(`${BASE_URL}/repos/${USERNAME}/no-repo`, { headers });
    expect(res.status()).toBe(404);
    console.log("Repo not found for deletion as expected with status: " + res.status());
    console.log("Error Message: " + (await res.json()).message);
    console.log("Repo Name: " + (await res.json()).name);
  });
});
