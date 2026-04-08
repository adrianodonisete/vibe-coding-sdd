import { expect, test } from "@playwright/test";

const spanishWords = ["gato", "perro", "casa", "libro", "agua"];
const englishWords = ["cat", "dog", "house", "book", "water"];

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("renders shell navigation and default study mode", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Spanish Flashcards" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Study" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Quiz" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Unknown Redo" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Stats" })).toBeVisible();
  await expect(page.getByText("Current screen: Study")).toBeVisible();
});

test("study starts with Spanish word and hides answer buttons until flip", async ({ page }) => {
  await expect(page.getByText("Spanish word")).toBeVisible();
  await expect(page.getByRole("button", { name: "Flip Card" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Right" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Wrong" })).toHaveCount(0);

  const wordLocator = page.locator("p.text-3xl");
  const displayedWord = (await wordLocator.textContent())?.trim();
  expect(displayedWord).toBeTruthy();
  expect(spanishWords).toContain(displayedWord as string);
});

test("flip reveals english and shows right/wrong buttons", async ({ page }) => {
  await page.getByRole("button", { name: "Flip Card" }).click();

  await expect(page.getByText("English")).toBeVisible();
  await expect(page.getByRole("button", { name: "Right" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Wrong" })).toBeVisible();

  const englishText = (await page.locator("p.text-2xl").textContent())?.trim();
  expect(englishText).toBeTruthy();
  expect(englishWords).toContain(englishText as string);
});

test("answering moves to next card and resets to hidden translation", async ({ page }) => {
  const beforeWord = ((await page.locator("p.text-3xl").textContent()) ?? "").trim();

  await page.getByRole("button", { name: "Flip Card" }).click();
  await page.getByRole("button", { name: "Right" }).click();

  const afterWord = ((await page.locator("p.text-3xl").textContent()) ?? "").trim();
  expect(afterWord).not.toBe(beforeWord);
  await expect(page.getByRole("button", { name: "Flip Card" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Right" })).toHaveCount(0);
  await expect(page.getByText("Flip the card to reveal the English translation.")).toBeVisible();
});

test("selected mode persists after reload", async ({ page }) => {
  await page.getByRole("button", { name: "Quiz" }).click();
  await expect(page.getByText("Current screen: Quiz")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Quiz" })).toBeVisible();

  await page.reload();

  await expect(page.getByText("Current screen: Quiz")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Quiz" })).toBeVisible();
});
