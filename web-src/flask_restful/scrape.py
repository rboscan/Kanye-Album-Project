from bs4 import BeautifulSoup as bs
import requests
from selenium import webdriver
from splinter import Browser
import pandas as pd


def init_browser():

    executable_path = {'executable_path': 'chromedriver.exe'}
    browser = Browser('chrome', **executable_path, headless=False)

    return browser